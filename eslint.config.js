import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	eslintPluginPrettierRecommended,
];
