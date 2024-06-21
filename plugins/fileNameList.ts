import { Plugin } from 'vite';
import { getAllFilesRecursive, writeToFile } from './utils';
import * as path from 'path';

export default function fileListPlugin(): Plugin {
	return {
		name: 'file-list-plugin',
		async buildStart() {
			const getFilesInFolder = (type: string) => {
				const folderPath = `./public/${type}`,
					fileNames = getAllFilesRecursive(folderPath);
				writeToFile(
					`./src/ts/assets/${type}Files.ts`.pj(),
					`export const ${type}Files = ['${fileNames.join("',\n'")}']`,
				);
			};

			['audio', 'image'].forEach((value: string) => getFilesInFolder(value));
		},
	};
}
