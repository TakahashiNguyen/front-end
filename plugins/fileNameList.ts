import { Plugin } from 'vite';
import { getAllFilesRecursive } from './utils';
import * as path from 'path';
import * as fs from 'fs';

export default function fileListPlugin(): Plugin {
	return {
		name: 'file-list-plugin',
		async buildStart() {
			const getFilesInFolder = (ext: string) => {
				const folderPath = `./public/.${ext}`,
					fileNames = getAllFilesRecursive(folderPath);
				fs.writeFileSync(
					path.join(__dirname, `/../src/ts/assets/${ext}Files.ts`),
					`export const ${ext}Files = ['${fileNames.map(i => `./${i}`).join("',\n'")}']`,
				);
			};

			['wav', 'jpg'].forEach((value: string) => getFilesInFolder(value));
		},
	};
}
