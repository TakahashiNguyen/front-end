<template>
	<div class="flex fixed z-40 full scale-150 middle-div -skew-y-6 lg:scale-100 dark:text-white text-black">
		<div
			class="fixed z-40 flex flex-col middle-div"
			:style="`text-shadow:${htmlStyles.textNameShadow}; color:${htmlStyles.textNameColor};`"
			ref="textDiv">
			<div class="cursor-help hover:animate-pulse flex flex-col justify-items-stretch" onclick="randomImageDelayLeft=0">
				<p id="nickName" class="capitalize justify-start flex font-['AnonymousPro']"></p>
				<p id="name" class="capitalize"></p>
				<p id="myHashTag" class="flex justify-end font-['JetBrainsMono']"></p>
			</div>
		</div>

		<div class="fixed -z-50 flex flex-col middle-div opacity-0" ref="textDivSub">
			<div class="flex flex-col justify-items-stretch">
				<p id="nickNameSub" class="capitalize justify-start flex font-['AnonymousPro']"></p>
				<p id="nameSub" class="capitalize"></p>
				<p id="myHashTagSub" class="flex justify-end font-['JetBrainsMono']"></p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { htmlStylesStore } from '../../stores/htmlStyles';

	export default {
		setup() {
			const htmlStyles = htmlStylesStore();
			return { htmlStyles };
		},
	};
</script>
