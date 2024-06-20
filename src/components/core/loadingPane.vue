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
	<div
		class="fixed cursor-pointer z-[100] bg-white dark:bg-black h-lvh w-full"
		ref="loadingPage"
	>
		<div class="absolute z-50 full select-none bg-transparent"></div>
		<div class="absolute flex square">
			<picture class="flex middle-div full">
				<img
					src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png"
					class="middle-div dObject-dark w-[18%] h-[18%]"
				/>
				<img
					src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png"
					class="middle-div dObject w-[18%] h-[18%]"
				/>
			</picture>
		</div>
	</div>
</template>

<script lang="ts">
	import { Howl } from 'howler';
	import { fade } from '@ts/core/Animation';
	import { ref } from 'vue';
	//@ts-ignore
	import { audioFiles } from '@ts/assets/audioFiles';

	const startupAudio = audioFiles.get('startup').random();

	export default {
		setup() {
			const loadingPage = ref<HTMLElement>();
			return { loadingPage };
		},
		mounted() {
			this.audio.once('load', this.fadePane);
			this.audio.play();
		},
		data() {
			const audio = new Howl({
				src: startupAudio,
				volume: 1,
				autoplay: true,
				onplayerror: function () {
					audio.once('unlock', function () {
						audio.play();
					});
				},
			});

			return { audio };
		},
		methods: {
			fadePane() {
				fade(this.loadingPage!, 3, 1, 0, 144, () => {
					this.loadingPage!.classList.add('hidden');
				});
			},
		},
	};
</script>
