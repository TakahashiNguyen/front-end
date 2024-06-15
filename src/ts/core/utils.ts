import { Howl } from 'howler';
import { fade } from '../../ts/core/Animation';
import { wavFiles } from '../../ts/assets/wavFiles';

// functions
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
	getRandomInt = (max: number) => Math.floor(Math.random() * max);

// consts
export const startupSound = new Howl({
	src: wavFiles.random('startup'),
	volume: 1,
	onplay: () => {
		const loadingPage = 'loadingPage'.getElement();

		fade(loadingPage, startupSound.duration(), 1, 0, 144, () => {
			loadingPage.classList.add('hidden');
		});
	},
	onplayerror: function () {
		startupSound.once('unlock', function () {
			startupSound.play();
		});
	},
	autoplay: true,
});
