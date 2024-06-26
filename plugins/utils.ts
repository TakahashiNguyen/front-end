import * as fs from 'fs';
import './types';

export function getAllFilesRecursive(dirPath: string): string[] {
	try {
		const files: string[] = [],
			entries = fs.readdirSync(dirPath);

		for (const entry of entries) {
			const fullPath = `${dirPath}/${entry}`,
				stats = fs.statSync(fullPath);

			if (stats.isDirectory()) {
				files.push(...getAllFilesRecursive(fullPath));
			} else {
				files.push(fullPath.replace('./public', './'));
			}
		}

		return files;
	} catch (error) {
		return [];
	}
}

export function slinceFileAt(file: string, line: string) {
	const content = fs.readFileSync(file.pj()).toString().split('\n'),
		targetLine = content.findIndex(l => l.includes(line));

	return { f: content.slice(0, targetLine), s: content.slice(targetLine + 1) };
}

export function writeToFile(filePath: string, content: string) {
	const directoryPath = filePath.substring(
		0,
		filePath.lastIndexOf(process.platform === 'win32' ? '\\' : '/'),
	);

	if (!fs.existsSync(directoryPath)) {
		fs.mkdirSync(directoryPath, { recursive: true });
	}

	fs.writeFileSync(filePath, content);
}
