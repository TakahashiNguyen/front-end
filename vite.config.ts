import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fileListPlugin from './plugins/fileNameList';
import appendType from './plugins/appendTypes';
import { Plugin } from 'vite';
import Unfonts from 'unplugin-fonts/vite';
import { getAllFilesRecursive } from './plugins/utils';
import { CustomFontFamily } from 'unplugin-fonts/types';
import path from 'path';

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
		[
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
			...plugins.map((i): Plugin => {
				return { ...i(), apply: 'serve' };
			}),
			...plugins.map((i): Plugin => {
				return { ...i(), apply: 'build' };
			}),
		],
	],
	build: {
		outDir: 'dist',
	},
	resolve: {
		alias: {
			'@ts': path.resolve(__dirname, './src/ts'),
			'@cp': path.resolve(__dirname, './src/components'),
			'@st': path.resolve(__dirname, './src/stores'),
			'@sc': path.resolve(__dirname, './src/scss'),
		},
	},
	base: '/front-end/',
});
