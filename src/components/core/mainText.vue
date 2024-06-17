<style scoped>
	.square {
		--square-size: calc(min(100vw, 100vh));
		width: var(--square-size);
		height: var(--square-size);
	}

	.scale-text {
		--square-size: calc(min(100vw, 100vh) / 27);
		font-size: calc(var(--square-size));
		line-height: calc(var(--square-size) * 9 / 8);
	}
</style>

<template>
	<div class="h-dvh flex middle-div dark:text-white text-black">
		<div class="middle-div flex square" ref="textSqr">
			<div
				class="absolute z-40 flex flex-col middle-div scale-150 -skew-y-6 lg:scale-100 scale-text"
				:style="`text-shadow:${htmlStyles.textNameShadow}; color:${htmlStyles.textNameColor};`"
				ref="textDiv">
				<div class="cursor-help hover:animate-pulse flex flex-col justify-items-stretch" @click="variables.randomImageDelayLeft = 0">
					<p id="nickName" class="capitalize justify-start flex font-['AnonymousPro']"></p>
					<p id="name" class="capitalize"></p>
					<p id="myHashTag" class="flex justify-end font-['JetBrainsMono']"></p>
				</div>
			</div>

			<div class="-z-50 flex flex-col middle-div opacity-0 scale-150 -skew-y-6 lg:scale-100 scale-text" ref="textDivSub">
				<div class="flex flex-col justify-items-stretch">
					<p id="nickNameSub" class="capitalize justify-start flex font-['AnonymousPro']"></p>
					<p id="nameSub" class="capitalize"></p>
					<p id="myHashTagSub" class="flex justify-end font-['JetBrainsMono']"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { htmlStylesStore } from '../../stores/htmlStyles';
	import { variablesStore } from '../../stores/variables';

	export default {
		setup() {
			const htmlStyles = htmlStylesStore();
			const variables = variablesStore();
			return { htmlStyles, variables };
		},
	};
</script>
