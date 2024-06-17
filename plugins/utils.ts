import * as path from 'path';
import * as fs from 'fs';
import '../src/types';

export function getAllFilesRecursive(dirPath: string): string[] {
	const files: string[] = [],
		entries = fs.readdirSync(dirPath);

	for (const entry of entries) {
		const fullPath = path.join(dirPath, entry),
			stats = fs.statSync(fullPath);

		if (stats.isDirectory()) {
			files.push(...getAllFilesRecursive(fullPath));
		} else {
			files.push(fullPath.split('\\').slice(1).join('/'));
		}
	}

	return files;
}
