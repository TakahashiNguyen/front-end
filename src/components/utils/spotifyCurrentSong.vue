<template>
	<div
		class="absolute tl-8 z-50 flex origin-top-left translate-x-[63px] rotate-90 scale-75 cursor-wait sm:translate-x-0 sm:translate-y-0 sm:rotate-0 sm:scale-100"
	>
		<iframe
			:src="`https://spotify-github-profile.vercel.app/api/view.svg?uid=${userID}&cover_image=true&theme=natemoo-re&show_offline=true&interchange=true&bar_color=53b14f&bar_color_cover=true`"
			frameborder="0"
			id="mySpotify"
			height="84px"
			width="320px"
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
