import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fileListPlugin from './plugins/fileNameList';
import fontsListing from './plugins/fontsListing';
import appendType from './plugins/appendTypes';
import { Plugin } from 'vite';

// https://vitejs.dev/config/
const plugins = [fileListPlugin, fontsListing, appendType];

export default defineConfig({
	plugins: [vue()]
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
