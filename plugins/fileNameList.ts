import { Plugin } from 'vite';

export default function fileListPlugin(): Plugin {
	return {
		name: 'file-list-plugin',
		async buildStart() {
			const path = await import('path'),
				fs = await import('fs');

			const getAllFilesRecursive = (dirPath: string): string[] => {
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
				},
				getFilesInFolder = (ext: string) => {
					const folderPath = `./public/.${ext}`,
						fileNames = getAllFilesRecursive(folderPath);
					fs.writeFileSync(
						path.join(__dirname, `/../src/ts/assets/${ext}Files.ts`),
						`export const ${ext}Files = ['${fileNames.map(i => `./${i}`).join("',\n'")}']`,
					);
				};

			['wav', 'jpg'].map((value: string) => getFilesInFolder(value));
		},
	};
}
