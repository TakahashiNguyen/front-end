<style scoped>
	.square {
		--square-size: calc(min(100vw, 100vh));
		width: var(--square-size);
		height: var(--square-size);
	}

	.scale-mainName {
		--square-size: calc(min(100vw, 100vh) / 15);
		font-size: calc(var(--square-size));
		line-height: calc(var(--square-size) * 9 / 8);
	}

	.scale-nickName {
		--square-size: calc(min(100vw, 100vh) / 27);
		font-size: calc(var(--square-size));
		line-height: calc(var(--square-size) * 9 / 8);
	}

	.scale-hashTag {
		--square-size: calc(min(100vw, 100vh) / 50);
		font-size: calc(var(--square-size));
		line-height: calc(var(--square-size) * 9 / 8);
	}
</style>

<template>
	<div class="h-dvh flex middle-div dark:text-white text-black">
		<div class="middle-div flex square" ref="textSqr">
			<div
				class="absolute z-40 flex flex-col middle-div scale-125 -skew-y-6 lg:scale-100"
				:style="`text-shadow:${htmlStyles.textNameShadow}; color:${htmlStyles.textNameColor};`"
				ref="textDiv">
				<div class="cursor-help hover:animate-pulse flex flex-col justify-items-stretch" @click="variables.randomImageDelayLeft = 0">
					<p ref="nickName" class="capitalize justify-start flex font-['AnonymousPro'] scale-nickName"></p>
					<p ref="name" class="capitalize scale-mainName" :style="`font-family: ${luckyFont}`"></p>
					<p ref="myHashTag" class="flex justify-end font-['JetBrainsMono'] scale-hashTag"></p>
				</div>
			</div>

			<div class="-z-50 flex flex-col middle-div opacity-0 scale-125 -skew-y-6 lg:scale-100" ref="textDivSub">
				<div class="flex flex-col justify-items-stretch">
					<p ref="nickNameSub" class="capitalize justify-start flex font-['AnonymousPro'] scale-nickName"></p>
					<p ref="nameSub" class="capitalize scale-mainName" :style="`font-family: ${luckyFont}`"></p>
					<p ref="myHashTagSub" class="flex justify-end font-['JetBrainsMono'] scale-hashTag"></p>
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
			const htmlStyles = htmlStylesStore(),
				variables = variablesStore(),
				luckyFont = [
					'Peristiwa',
					'Chromate',
					'attena',
					'TimberWolf',
					'Gerlomi',
					'Amoitar',
					'Sigokae',
					'Ginger',
					'WylieVoigen',
					'Magnificent',
					'Karasha',
					'sofia',
				].random();
			return { htmlStyles, variables, luckyFont };
		},
		mounted() {},
		methods: {},
	};
</script>
