import { Plugin } from 'vite';
import { getAllFilesRecursive, writeToFile } from './utils';
import * as path from 'path';

export default function fileListPlugin(): Plugin {
	return {
		name: 'file-list-plugin',
		async buildStart() {
			const getFilesInFolder = (ext: string) => {
				const folderPath = `./public/.${ext}`,
					fileNames = getAllFilesRecursive(folderPath);
				writeToFile(
					`./src/ts/assets/${ext}Files.ts`.pj(),
					`export const ${ext}Files = ['${fileNames.join("',\n'")}']`,
				);
			};

			['webp', 'mp3'].forEach((value: string) => getFilesInFolder(value));
		},
	};
}
