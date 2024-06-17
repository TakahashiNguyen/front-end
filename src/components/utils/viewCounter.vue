<script lang="ts">
	import LoadingPane from '../core/loadingPane.vue';

	export default {
		setup() {
			return { LoadingPane };
		},
		mounted() {},
	};
</script>

<template>
	<div
		class="absolute br-8 z-50 cursor-zoom-in origin-bottom-right sm:translate-x-0 sm:translate-y-0 sm:rotate-0 translate-y-[-112px] rotate-[-90deg]"
		@click="LoadingPane.methods?.startupSound()">
		<picture>
			<img
				src="https://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2FTakahashiNguyen%2FTakahashiNguyen.json&style=flat&label=S%E1%BB%91%20l%C6%B0%E1%BB%A3t%20th%C4%83m&labelColor=080808&color=f05237"
				class="dObject-dark" />
			<img
				src="https://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2FTakahashiNguyen%2FTakahashiNguyen.json&style=flat&label=S%E1%BB%91%20l%C6%B0%E1%BB%A3t%20th%C4%83m&labelColor=f05237&color=f7f7f7"
				class="dObject" />
		</picture>
	</div>
</template>
