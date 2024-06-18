import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fileListPlugin from './plugins/fileNameList';
import fontsListing from './plugins/fontsListing';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), fileListPlugin(), fontsListing()],
	build: {
		outDir: 'dist',
	},
	base: '/front-end/',
});
