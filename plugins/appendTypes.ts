import { Plugin } from 'vite';
import * as fs from 'fs';
import * as path from 'path';

const conflictMarker = '<<<<<<< HEAD\n';

/**
 * find line that has subStr value
 * @param {string[]} arr - the array to scan
 * @param {string} subStr - the string to find
 * @return {number[]} array of arr's index that it contain subStr
 */
function findLine(arr: string[], subStr: string): number[] {
	const indices: number[] = [];
	arr.forEach((str, index) => {
		if (str.indexOf(subStr) !== -1) indices.push(index);
	});
	if (!indices.length) indices.push(0);
	return indices;
}

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
	const nlIndicator = '///nl///',
		file1Lines = fs
			.readFileSync(file1Path)
			.toString()
			.split(/\r?\n/)
			.map(i => (i === '' ? nlIndicator : i)),
		file2Lines = fs
			.readFileSync(file2Path)
			.toString()
			.split(/\r?\n/)
			.map(i => (i === '' ? nlIndicator : i)),
		/**
		 * find conflict between two array
		 * @param {string[]} arr1 - first array
		 * @param {string[]} arr2 - second array
		 * @return {Array<string>} the merge conflict of two file
		 */
		findConflict = (arr1: Array<string>, arr2: Array<string>): Array<string> => {
			let mergedLines: string[] = [],
				inConflict = false,
				i = 0,
				j = 0;
			if (Boolean(arr1.length) != Boolean(arr2.length))
				return commitConflict(mergedLines, arr1.join('\n'), arr2.join('\n'));

			while (i < arr1.length || j < arr2.length) {
				const line1 = arr1[i++],
					line2 = arr2[j++];

				if (
					line1.replace(new RegExp('\t', 'g'), '') ===
					line2.replace(new RegExp('\t', 'g'), '')
				) {
					mergedLines.push(line1);
				} else {
					const change1 = findLine(arr1.slice(i - 1), line2)[0],
						change2 = findLine(arr2.slice(j - 1), line1)[0],
						diffLine = Number(change1 !== change2);
					if (change1 && change2) {
						const firstConflict = arr1
								.slice(i - 1, i + change1 - 1)
								.concat(...findConflict(arr1.slice(i + change1 - 1), arr2.slice(j - 1))),
							secondConflict = arr2
								.slice(j - 1, j + change2 - 1)
								.concat(...findConflict(arr1.slice(i - 1), arr2.slice(j + change2 - 1)));

						mergedLines.push(
							...(firstConflict.join().length < secondConflict.join().length
								? firstConflict
								: secondConflict),
						);
						return mergedLines;
					} else {
						commitConflict(
							mergedLines,
							arr1.slice(i - 1, i + change1 - diffLine).join('\n'),
							arr2.slice(j - 1, j + change2 - diffLine).join('\n'),
						);
					}
					(inConflict = true), (i += change1 - diffLine), (j += change2 - diffLine);
				}
			}

			return mergedLines !== arr1 ? mergedLines : [];
		};

	const output = findConflict(file1Lines, file2Lines);
	if (output)
		fs.writeFileSync(
			outputFilePath,
			output
				.join('\n')
				.replace(new RegExp(nlIndicator, 'g'), '\n')
				.replace(new RegExp('\n\n', 'g'), '\n'),
		);

	return output.length > 0;
}

export default function appendType(): Plugin {
	return {
		name: 'append-types',
		async buildStart() {
			const sourceFile = path.join(__dirname, './types.ts'),
				targetFile = path.join(__dirname, '../src/ts/plugins/types.ts'),
				conflictFile = path.join(__dirname, '../types.ts');

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
