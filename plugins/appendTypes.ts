import { Plugin } from 'vite';
import { slinceFileAt } from './utils';
import * as fs from 'fs';
import * as path from 'path';

export default function appendType(): Plugin {
	return {
		name: 'append-types',
		async buildStart() {
			const sourceFile = './types.ts',
				targetFile = '../src/ts/plugins/types.ts';

			fs.writeFileSync(path.join(__dirname, targetFile), fs.readFileSync(path.join(__dirname, sourceFile)));
		},
	};
}
