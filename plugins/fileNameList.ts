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
					path.join(__dirname, `/../src/ts/assets/${ext}Files.ts`),
					`export const ${ext}Files = ['${fileNames.map(i => `./${i}`).join("',\n'")}']`,
				);
			};

			['wav', 'jpg', 'webp'].forEach((value: string) => getFilesInFolder(value));
		},
	};
}
