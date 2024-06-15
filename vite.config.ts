import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fileListPlugin from './plugins/fileNameList';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), fileListPlugin()],
	build: {
		outDir: 'dist',
	},
});
