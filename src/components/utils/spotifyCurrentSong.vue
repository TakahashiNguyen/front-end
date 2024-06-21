<style scoped></style>
<template>
	<div
		class="absolute tl-8 z-50 flex origin-top-left translate-x-[64px] rotate-90 scale-[0.4] cursor-wait sm:translate-x-0 sm:translate-y-0 sm:rotate-0 sm:scale-[0.512]"
	>
		<iframe
			:src="`https://moving-thrush-physically.ngrok-free.app/api?id=${userID}`"
			frameborder="0"
			id="mySpotify"
			height="160px"
			width="625px"
			class="z-40"
		></iframe>
		<div class="absolute z-50 full select-none bg-transparent"></div>
		<div class="fixed z-30 full backdrop-blur-md blurBackground"></div>
	</div>
</template>

<script lang="ts">
	export default {
		props: {
			userID: {
				type: String,
				required: false,
				default: '31y4j5i6zru4mnmqsvx5cqqgmp3a',
			},
		},
	};
</script>
