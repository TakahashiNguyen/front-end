<template>
	<div
		class="absolute br-8 z-50 cursor-zoom-in origin-bottom-left sm:translate-x-0 translate-x-[100%] sm:translate-y-0 sm:rotate-0 rotate-[-90deg]"
		@click="LoadingPane.data"
	>
		<picture>
			<img
				:src="`https\://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2FTakahashiNguyen%2FTakahashiNguyen.json&style=flat&label=${$t('visitCount', '', { ns: 'lang' })}&labelColor=080808&color=f05237`"
				class="dObject-dark"
			/>
			<img
				:src="`https\://img.shields.io/endpoint?url=https%3A%2F%2Fhits.dwyl.com%2FTakahashiNguyen%2FTakahashiNguyen.json&style=flat&label=${$t('visitCount', '', { ns: 'lang' })}&labelColor=f05237&color=f7f7f7`"
				class="dObject"
			/>
		</picture>
	</div>
</template>

<script lang="ts">
	import LoadingPane from '../core/loadingPane.vue';

	export default {
		setup() {
			return { LoadingPane };
		},
	};
</script>
