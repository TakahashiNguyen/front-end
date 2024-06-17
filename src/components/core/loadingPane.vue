<style scoped>
	.square {
		width: calc(min(100vw, 100vh));
		height: calc(min(100vw, 100vh));
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>

<template>
	<div class="fixed cursor-pointer z-[100] bg-white dark:bg-black h-lvh w-full" ref="loadingPage">
		<div class="absolute flex square">
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

<script lang="ts">
	import { Howl } from 'howler';
	import { fade } from '../../ts/core/Animation';
	import { wavFiles } from '../../ts/assets/wavFiles';

	const startupSong = wavFiles.get('startup').random();

	window.addEventListener('DOMContentLoaded', async () => {
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
	});

	export default {
		setup() {},
		mounted() {
			this.startupSound();
		},
		methods: {
			startupSound() {
				const sound = new Howl({
					src: startupSong,
					volume: 1,
					onplay: () => {
						try {
							const loadingPage = this.$refs.loadingPage as HTMLElement;

							fade(loadingPage, sound.duration(), 1, 0, 144, () => {
								loadingPage.classList.add('hidden');
							});
						} catch (e) {}
					},
					onplayerror: function () {
						sound.once('unlock', function () {
							sound.play();
						});
					},
					autoplay: true,
				});
			},
		},
	};
</script>
