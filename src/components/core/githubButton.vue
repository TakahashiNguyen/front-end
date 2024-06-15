<script lang="ts">
	import { getRandomInt } from '../../ts/core/utils';

	const buttonOpen = () => {
		window.open(getRandomInt(6) ? 'https://github.com/TakahashiNguyen' : 'https://www.youtube.com/@vtv24', '_blank');
	};

	export default {
		setup() {
			return { buttonOpen };
		},
	};
</script>

<template>
	<div class="absolute tr-8 z-50 cursor-grabbing" @click="buttonOpen">
		<div class="relative h-9 w-9">
			<div>
				<img src="/.svg/github-mark-white.svg" class="dObject-dark absolute" />
				<img src="/.svg/github-mark.svg" class="dObject z-50 absolute" />
			</div>
			<div class="absolute -z-50 animate-[spin_6s_linear_infinite] rounded-full blurBackground">
				<div class="h-9 w-9 rounded-full outline-dashed outline-2 outline-offset-2 ll" id="githubSpin"></div>
			</div>
		</div>
	</div>
</template>
