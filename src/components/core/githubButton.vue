<template>
	<div class="absolute tr-8 z-50 cursor-grabbing" @click="buttonOpen">
		<div class="relative h-9 w-9">
			<picture class="z-50 absolute">
				<img src="/.svg/github-mark-white.svg" class="dObject-dark" />
				<img src="/.svg/github-mark.svg" class="dObject" />
			</picture>
			<div class="-z-50 animate-[spin_6s_linear_infinite] rounded-full blurBackground">
				<div
					class="rounded-full outline-dashed outline-2 outline-offset-2 h-9 w-9"
					:class="`outline-[${htmlStyles.outlineColor}]`"
					ref="githubSpin"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { getRandomInt } from '../../ts/core/utils';
	import { htmlStylesStore } from '../../stores/htmlStyles';

	const buttonOpen = () => {
		window.open(getRandomInt(6) ? 'https://github.com/TakahashiNguyen' : 'https://www.youtube.com/@vtv24', '_blank');
	};

	export default {
		setup() {
			const htmlStyles = htmlStylesStore();
			return { buttonOpen, htmlStyles };
		},
	};
</script>
