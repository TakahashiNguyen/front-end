import { Plugin } from 'vite';
import { getAllFilesRecursive, writeToFile } from './utils';
import * as fs from 'fs';
import * as path from 'path';

export default function fontsListing(): Plugin {
	return {
		name: 'fonts-listing',
		async buildStart() {
			const outputFile = path.join(__dirname, '/../src/scss/fonts.scss'),
				getFonts = (ext: string) => {
					const folderPath = `./public/.${ext}`,
						fonts = getAllFilesRecursive(folderPath);

					fonts.forEach(v => {
						fs.appendFileSync(
							outputFile,
							`
@font-face {
	font-family: ${v.split('/').last().split('.')[0]};
	src: url(/${v});
}
							`,
						);
					});
				};

			writeToFile(outputFile, '');
			['otf', 'ttf'].forEach((v: string) => getFonts(v));
		},
	};
}
