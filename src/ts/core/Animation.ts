import { sleep } from './utils';

export async function fade(
	element: HTMLElement,
	duration: number,
	from: number,
	to: number,
	fps = 60,
	callafter = () => {},
) {
	let l = from;
	const i = (from > to ? -1 : 1) * (1 / (duration * fps));
	while (from < to ? l < to : l > to) {
		element.style.opacity = String(l);
		l += i;
		await sleep((1 / fps) * 1000);
	}
	element.style.opacity = String(to);
	callafter();
}
