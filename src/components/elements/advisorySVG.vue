<style scoped></style>
<template>
	<svg
		width="100"
		height="16"
		class="z-50 bg-transparent basis-1/3"
		:style="{ letterSpacing: letterSpace }"
		xmlns="http://www.w3.org/2000/svg"
	>
		<defs>
			<mask :id="id">
				<rect class="fill-white full" />
				<text x="51%" y="60%" text-anchor="middle" alignment-baseline="middle">
					<slot />
				</text>
			</mask>
		</defs>
		<rect
			class="dark:fill-white fill-black"
			width="100%"
			height="100%"
			:style="`mask: url(#${id});`"
		/>
	</svg>
</template>
<script lang="ts">
	import { ref } from 'vue';
	import { randomString } from '@ts/core/utils';

	export default {
		setup() {
			const maskMold = ref<HTMLElement>();
			var id = randomString();

			return { maskMold, id };
		},
		props: {
			letterSpace: {
				type: String,
				required: true,
			},
		},
	};
</script>
