<script lang="ts">
	import { Howl } from 'howler';
	import { fade } from '../../ts/core/Animation';
	import { wavFiles } from '../../ts/assets/wavFiles';

	window.addEventListener('DOMContentLoaded', async () => {
		const loadingPage = 'loadingPage'.getElement();

		//textResize();

		let luckyFont = [
			'Peristiwa',
			'Chromate',
			'attena',
			'TimberWolf',
			'Gerlomi',
			'Amoitar',
			'Sigokae',
			'Ginger',
			'WylieVoigen',
			'Magnificent',
			'Karasha',
			'sofia',
		].random();
		//getElementById('name').classList.add(`font-['${luckyFont}']`);
		//getElementById('nameSub').classList.add(`font-['${luckyFont}']`);

		//window.isStartupSoundStarted = 0;
		const startupSound = new Howl({
			src: wavFiles.random('startup'),
			volume: 1,
			onplay: () => {
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

		startupSound.play();
	});

	export default {
		setup() {},
	};
</script>
<template>
	<div class="fixed cursor-pointer z-[100] bg-white dark:bg-black h-lvh w-full" id="loadingPage">
		<div class="absolute flex square" style="opacity: 1">
			<picture class="flex middle-div full">
				<img
					src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png"
					class="middle-div dObject-dark w-[18%] h-[18%]" />
				<img
					src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png"
					class="middle-div dObject w-[18%] h-[18%]" />
			</picture>
		</div>
	</div>
</template>
