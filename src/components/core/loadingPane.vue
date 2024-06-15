<script lang="ts">
	import { startupSound } from '../../ts/core/utils';

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
