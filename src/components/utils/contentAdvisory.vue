<style scoped></style>
<template>
	<div
		class="group/advisory absolute bl-8 z-50 flex animate-shake cursor-not-allowed flex-col-reverse text-center hover:animate-none sm:flex-row font-['GothicA1'] text-[0.75rem] select-nonee"
	>
		<div class="flex flex-col w-[6.25rem] blurBackground">
			<advisorySVG letter-space="0.15rem">
				<T key-name="top" ns="advisory" />
			</advisorySVG>
			<svg
				width="100"
				height="16"
				class="z-10 bg-transparent text-[1rem] tracking-[0.05rem] basis-1/3 dark:text-white text-black scale-y-150"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<mask id="midAdvisoryText">
						<rect class="fill-black full" />
						<text
							x="51%"
							y="60%"
							dominant-baseline="middle"
							text-anchor="middle"
							class="fill-white"
						>
							<T key-name="mid" ns="advisory" />
						</text>
					</mask>
				</defs>
				<rect
					class="dark:fill-white fill-black"
					style="mask: url(#midAdvisoryText)"
					width="100%"
					height="100%"
				/>
			</svg>
			<advisorySVG letter-space="0.10rem">
				<T key-name="bot" ns="advisory" />
			</advisorySVG>
		</div>
		<div
			class="scale-75 translate-x-[-12.5%] translate-y-[12.5%] sm:scale-100 sm:translate-x-0 sm:translate-y-0"
		>
			<div
				class="relative flex justify-center overflow-hidden bg-transparent duration-[2000ms] max-sm:h-0 max-sm:w-full max-sm:items-start max-sm:group-hover/advisory:h-10 sm:h-full sm:w-0 sm:items-center sm:justify-end sm:group-hover/advisory:w-full"
			>
				<div
					class="text-nowrap mx-[10px] text-[27px] text-white dark:text-[#370037] dark:drop-shadow-[0px_0px_10px_white] drop-shadow-[0px_0px_10px_black] font-['Oswald']"
				>
					<T keyName="countDown" ns="advisory" :params="{ msg: message! }" />
				</div>
				<svg
					class="absolute -z-50 bg-transparent full"
					xmlns="http://www.w3.org/2000/svg"
				>
					<foreignObject width="100%" height="100%">
						<iframe
							title="binaryBackground"
							src=""
							class="full bg-white/[.32]"
							frameborder="0"
						>
						</iframe>
					</foreignObject>
				</svg>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import { ref } from 'vue';
	import { T } from '@tolgee/vue';
	import advisorySVG from '../elements/advisorySVG.vue';

	export default {
		setup() {
			const targetDate = new Date('2024-01-28T00:00:00'),
				message = ref<string>();
			targetDate.setMonth(targetDate.getMonth() + 19);

			return { message, targetDate };
		},
		components: {
			advisorySVG,
			T,
		},
		mounted() {
			setInterval(() => {
				const now = new Date().getTime(),
					remainingTime = this.targetDate.getTime() - now,
					days = (remainingTime / (1000 * 60 * 60 * 24)).f().a(),
					hours = ((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).f().a(),
					minutes = ((remainingTime % (1000 * 60 * 60)) / (1000 * 60)).f().a(),
					seconds = ((remainingTime % (1000 * 60)) / 1000).f().a();

				this.message = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
			}, 1000);
		},
		methods: {},
	};
</script>
