import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

const conflictMarker = '<<<<<<< HEAD\n';

/**
 * commit conflict to array
 * @param {string[]} arr - array that contain commit conflicts
 * @param {string} first - first conflict
 * @param {string} second - second conflict
 * @return {string[]} same value with arr
 */
function commitConflict(arr: string[], first: string, second: string): string[] {
	arr.push([conflictMarker, first, '=======', second, '>>>>>>>'].join('\n'));
	return arr;
}

/**
 * Compare two files and merging them
 * @param {string} file1Path - first file path
 * @param {string} file2Path - second file path
 * @param {string} outputFilePath - ouput file to see conflicts and merge
 * @return {Promise<boolean>} if files conflict
 */
async function isConflict(
	file1Path: string,
	file2Path: string,
	outputFilePath: string,
): Promise<boolean> {
	const nlInd = '///nl///',
		tabInd = '///tab///',
		strictStr = (input: string): string => {
			return input
				.replace(new RegExp('\t', 'g'), tabInd)
				.replace(new RegExp('\n', 'g'), nlInd)
				.replace(new RegExp(tabInd, 'g'), '')
				.replace(new RegExp(nlInd, 'g'), '')
				.trim();
		},
		/**
		 * format input string
		 * @param {string} input - input string
		 * @return {string} formated string
		 */
		zipStr = (input: string): string => {
			return input
				.replace(new RegExp('\t', 'g'), tabInd)
				.replace(new RegExp('\n', 'g'), nlInd);
		},
		/**
		 * unformat input string
		 * @param {string} input - input string
		 * @return {string} unformat string
		 */
		unZipStr = (input: string): string => {
			return input
				.replace(new RegExp(nlInd, 'g'), '\n')
				.replace(new RegExp(tabInd, 'g'), '\t')
				.replace(new RegExp('\n\n', 'g'), '\n');
		},
		file1Lines = zipStr(fs.readFileSync(file1Path).toString())
			.split(nlInd)
			.map(i => (i === '' ? nlInd : i)),
		file2Lines = zipStr(fs.readFileSync(file2Path).toString())
			.split(nlInd)
			.map(i => (i === '' ? nlInd : i)),
		/**
		 * find line that has subStr value
		 * @param {string[]} arr - the array to scan
		 * @param {string} subStr - the string to find
		 * @return {number[]} array of arr's index that it contain subStr
		 */
		findLine = (arr: string[], subStr: string): number[] => {
			const indices: number[] = [];
			subStr = unZipStr(subStr);
			arr.forEach((str, index) => {
				if (unZipStr(str).indexOf(subStr) !== -1) indices.push(index);
			});
			if (!indices.length) indices.push(0);
			return indices;
		},
		/**
		 * find conflict between two array
		 * @param {string[]} arr1 - first array
		 * @param {string[]} arr2 - second array
		 * @return {Array<string>} the merge conflict of two file
		 */
		findConflict = (arr1: Array<string>, arr2: Array<string>): string => {
			let mergedLines: string[] = [],
				i = 0,
				j = 0;
			if (Boolean(arr1.length) != Boolean(arr2.length))
				return commitConflict(mergedLines, arr1.join(nlInd), arr2.join(nlInd)).join(
					nlInd,
				);

			while (i < arr1.length || j < arr2.length) {
				const line1 = arr1[i],
					line2 = arr2[j];

				if (strictStr(line1) === strictStr(line2)) {
					mergedLines.push(line1);
				} else {
					const change1 = findLine(arr1.slice(i), line2)[0],
						change2 = findLine(arr2.slice(j), line1)[0],
						diffLine = Number(change1 !== change2);
					if (change1 && change2) {
						const firstConflict = arr1
								.slice(i, i + change1)
								.concat(findConflict(arr1.slice(i + change1), arr2.slice(j))),
							secondConflict = arr2
								.slice(j, j + change2)
								.concat(findConflict(arr1.slice(i), arr2.slice(j + change2)));

						mergedLines.push(
							...(strictStr(firstConflict.join()).length <
							strictStr(secondConflict.join()).length
								? firstConflict
								: secondConflict),
						);
						return zipStr(mergedLines.join('\n'));
					} else {
						commitConflict(
							mergedLines,
							arr1.slice(i, i + change1 + (diffLine ^ 1)).join('\n'),
							arr2.slice(j, j + change2 + (diffLine ^ 1)).join('\n'),
						);
					}
					(i += change1 - diffLine), (j += change2 - diffLine);
				}
				i++, j++;
			}

			return zipStr(mergedLines.join('\n')) !== zipStr(arr1.join('\n'))
				? zipStr(mergedLines.join('\n'))
				: '';
		};

	const output = findConflict(file1Lines, file2Lines);
	if (output) fs.writeFileSync(outputFilePath, unZipStr(output));

	return output.length > 0;
}

export default function appendType(): Plugin {
	return {
		name: 'append-types',
		async buildStart() {
			const sourceFile = './plugins/types.ts'.pj(),
				targetFile = './src/ts/plugins/types.ts'.pj(),
				conflictFile = './types.ts'.pj();

			if (
				fs.existsSync(conflictFile) &&
				!fs.readFileSync(conflictFile).toString().includes(conflictMarker)
			) {
				fs.writeFileSync(targetFile, fs.readFileSync(conflictFile));
				fs.writeFileSync(sourceFile, fs.readFileSync(conflictFile));
				fs.rmSync(conflictFile, { force: true });
				return;
			}
			if (await isConflict(sourceFile, targetFile, conflictFile)) {
				throw Error(`Conflicts detected! Please review the merged file.`);
			}
		},
	};
}
