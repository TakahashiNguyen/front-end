<template>
	<div
		class="rounded-full scale-[70%]"
		@click="
			to.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
				inline: 'nearest',
			})
		"
	>
		<img
			src="https://github.com/TakahashiNguyen.png"
			class="drop-shadow-xl cursor-pointer"
		/>
	</div>
</template>

<script lang="ts">
	export default {
		props: {
			to: {
				type: HTMLElement,
			},
		},
	};
</script>
