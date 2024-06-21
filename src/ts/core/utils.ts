import { Color } from '@ts/plugins/types';

// functions
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
	getRandomInt = (max: number) => Math.floor(Math.random() * max),
	rgbToHex = (i: Color) =>
		'#' +
		(
			(1 << 24) |
			((i[0] + luckyColor[0]) << 16).a() |
			((i[1] + luckyColor[1]) << 8).a() |
			(i[2] + luckyColor[2]).a()
		)
			.toString(16)
			.slice(1),
	hexToRgb = (hex: string, rr = 0, gg = 0, bb = 0) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#000000')!;
		return [
			parseInt(result[1], 16) + rr + luckyColor[0],
			parseInt(result[2], 16) + gg + luckyColor[1],
			parseInt(result[3], 16) + bb + luckyColor[2],
		] as Color;
	},
	floor = (v: number) => Math.floor(v),
	fetchDataUrl = (url: string) =>
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.blob();
			})
			.then(async data => {
				const reader = new FileReader();
				reader.readAsDataURL(data);
				while (reader.readyState !== 2) await sleep(100);
				return reader.result as string;
			}),
	fetchText = (url: string) =>
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.blob();
			})
			.then(async data => {
				const reader = new FileReader();
				reader.readAsText(data);
				while (reader.readyState !== 2) await sleep(100);
				return reader.result as string;
			}),
	randomString = (length = 10): string => {
		var ou = '';
		do {
			ou += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[getRandomInt(52)];
		} while (length-- > 0);
		return ou;
	};

// local consts
const luckyColor = [getRandomInt(13) - 6, getRandomInt(13) - 6, getRandomInt(13) - 6];
