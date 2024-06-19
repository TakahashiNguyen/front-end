import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fileListPlugin from './plugins/fileNameList';
import appendType from './plugins/appendTypes';
import { Plugin } from 'vite';
import Unfonts from 'unplugin-fonts/vite';
import { getAllFilesRecursive } from './plugins/utils';
import { CustomFontFamily } from 'unplugin-fonts/types';

// https://vitejs.dev/config/
const plugins = [fileListPlugin, appendType],
	getFonts = (exts: string[]): CustomFontFamily[] => {
		var ou: CustomFontFamily[] = [];
		exts.forEach((i: string) => {
			const folderPath = './public/',
				fonts = getAllFilesRecursive(folderPath + `.${i}`);

			fonts.forEach((v: string) => {
				ou.push({ name: v.split('/').last().split('.')[0], src: folderPath + v });
			});
		});

		return ou;
	};

export default defineConfig({
	plugins: [
		vue(),
		Unfonts({
			custom: {
				families: getFonts(['otf', 'ttf']),
				display: 'auto',
				preload: true,
				prefetch: false,
				injectTo: 'head',
			},
		}),
	]
		.concat(
			plugins.map((i): Plugin => {
				return { ...i(), apply: 'serve' };
			}),
		)
		.concat(
			plugins.map((i): Plugin => {
				return { ...i(), apply: 'build' };
			}),
		),
	build: {
		outDir: 'dist',
	},
	base: '/front-end/',
});
