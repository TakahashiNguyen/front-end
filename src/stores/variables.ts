import { defineStore } from 'pinia';

export const variablesStore = defineStore('variablesStore', {
	state: () => {
		return {
			randomImageDelayLeft: 0,
			isDarking: false,
		};
	},
	// could also be defined as
	// state: () => ({ count: 0 })
	actions: {},
});
