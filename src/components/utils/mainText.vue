<style scoped>
	.square {
		width: var(--square-size);
		height: var(--square-size);
	}

	.scale-mainName {
		font-size: calc(var(--square-size) / 15);
		line-height: calc(var(--square-size) / 15 * 9 / 8);
	}

	.scale-nickName {
		font-size: calc(var(--square-size) / 33);
		line-height: calc(var(--square-size) / 33 * 9 / 8);
	}

	.scale-hashTag {
		font-size: calc(var(--square-size) / 50);
		line-height: calc(var(--square-size) / 50 * 9 / 8);
	}
</style>

<template>
	<div class="h-dvh flex middle-div dark:text-white text-black select-none" :style="cssVars">
		<div class="middle-div flex square" ref="textSqr">
			<div
				class="absolute z-40 flex flex-col middle-div scale-125 -skew-y-6 lg:scale-100"
				:style="`text-shadow:${htmlStyles.textNameShadow}; color:${htmlStyles.textNameColor};`"
				ref="textDiv"
			>
				<div
					class="cursor-help hover:animate-pulse flex flex-col justify-items-stretch"
					@click="variables.randomImageDelayLeft = 0"
				>
					<p
						ref="nickName"
						class="capitalize justify-start flex font-nickName scale-nickName"
					></p>
					<p
						ref="name"
						class="capitalize scale-mainName"
						:style="`font-family: ${luckyFont}, Copperplate, Papyrus, fantasy`"
					></p>
					<p ref="myHashTag" class="flex justify-end font-hashTag scale-hashTag"></p>
				</div>
			</div>

			<div
				class="-z-50 flex flex-col middle-div opacity-0 scale-125 -skew-y-6 lg:scale-100"
				ref="textDivSub"
			>
				<div class="flex flex-col justify-items-stretch">
					<p
						ref="nickNameSub"
						class="capitalize justify-start flex font-nickName scale-nickName"
					></p>
					<p
						ref="nameSub"
						class="capitalize scale-mainName"
						:style="`font-family: ${luckyFont}, Copperplate, Papyrus, fantasy`"
					></p>
					<p ref="myHashTagSub" class="flex justify-end font-hashTag scale-hashTag"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { htmlStylesStore } from '@st/htmlStyles';
	import { variablesStore } from '@st/variables';
	import { ref } from 'vue';

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
				].random(),
				textDiv = ref<HTMLElement>();

			return { htmlStyles, variables, luckyFont, textDiv };
		},
		mounted() {
			const obj = this.$refs;
			Object.entries(obj)
				.filter(i => i[0].includes('name'))
				.forEach(i => ((i[1] as HTMLElement).textContent = this.$props.myName));
			Object.entries(obj)
				.filter(i => i[0].includes('nickName'))
				.forEach(i => ((i[1] as HTMLElement).textContent = this.$props.myNickName));
			Object.entries(obj)
				.filter(i => i[0].includes('myHashTag'))
				.forEach(
					i =>
						((i[1] as HTMLElement).textContent =
							(this.$props.hashTag !== '' ? '#' : '') + this.$props.hashTag),
				);
		},
		props: {
			myName: {
				type: String,
				default: 'Nguyễn Việt Anh',
			},
			myNickName: {
				type: String,
				default: 'Takahashi',
			},
			hashTag: {
				type: String,
				default: '',
			},
		},
		computed: {
			cssVars() {
				return {
					'--square-size': 'calc(min(100vw, 100vh))',
				};
			},
		},
	};
</script>
