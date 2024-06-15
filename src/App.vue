<script lang="ts">
	// Custom function for types
	declare global {
		interface Array<T> {
			random(): Array<T>;
		}
		interface String {
			getElement(): HTMLElement;
		}
	}

	Array.prototype.random = function () {
		return this[Math.floor(Math.random() * this.length)];
	};
	String.prototype.getElement = function () {
		return document.getElementById(String(this))!;
	};

	import { ref } from 'vue';
	import { Howl } from 'howler';
	import { fade } from './ts/core/Animation';

	const isDarkMode = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
		toggleDarkMode = () => {
			isDarkMode.value = !isDarkMode.value;
			document.querySelector('html')?.setAttribute('class', 'dark');
		},
		loadingPage = 'loadingPage'.getElement();

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

		//window.isStartupSoundStarted = 0;
		let playSrc: string;
		const startupSound = new Howl({
			src: playSrc,
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
		setup() {
			return { toggleDarkMode };
		},
	};
</script>

<template>
	<!--Loading page section-->
	<div
		class="absolute z-[100] h-dvh w-full bg-white dark:bg-black cursor-pointer flex middle-div pointer-events-none"
		ref="loadingPage"
		style="opacity: 1">
		<picture class="flex middle-div full">
			<img
				src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Penguin.png"
				width="18%"
				height="18%"
				class="middle-div dObject-dark" />
			<img
				alt=""
				src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png"
				width="18%"
				height="18%"
				class="middle-div dObject" />
		</picture>
	</div>

	<nav>
		<RouterLink to="/">Go to Home</RouterLink>
		<RouterLink to="/about">Go to About</RouterLink>
		<button @click="toggleDarkMode">Dark</button>
	</nav>

	<main>
		<RouterView />
	</main>
</template>

<style scoped lang="scss"></style>
