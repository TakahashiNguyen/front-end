import './utils';

export async function fade(element, duration, from, to, fps = 60, callafter = () => {}) {
	return new Promise<void>(async resolve => {
		var l = from,
			i = (from > to ? -1 : 1) * (1 / (duration * (fps / 1000)));
		while (from < to ? l < to : l > to) {
			try {
				element.style.opacity = l;
			} catch (error) {
				resolve();
				return;
			}
			l += i;
			await sleep((1 / fps) * 1000);
		}
		element.style.opacity = to;
		callafter();
		resolve();
	});
}
