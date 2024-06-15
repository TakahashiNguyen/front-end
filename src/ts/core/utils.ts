export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
	getRandomInt = (max: number) => Math.floor(Math.random() * max);
