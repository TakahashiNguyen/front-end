import { defineStore } from 'pinia';

export const htmlStylesStore = defineStore('htmlStyles', {
	state: () => {
		return { outlineColor: '', textNameColor: '', textNameShadow: '' };
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {},
});
