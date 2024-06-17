<style scoped></style>
<template>
	<div
		class="group/advisory absolute bl-8 z-50 flex animate-shake cursor-not-allowed flex-col-reverse text-center hover:animate-none sm:flex-row font-['GothicA1'] text-[0.75rem]">
		<div class="flex flex-col w-[6.25rem] blurBackground">
			<svg width="100" height="16" class="tracking-[0.18rem] z-50 bg-transparent basis-1/3" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<mask id="topAdvisoryText">
						<rect class="fill-white full" />
						<text x="51%" y="60%" text-anchor="middle" alignment-baseline="middle">PRIORITIZE</text>
					</mask>
				</defs>
				<rect class="dark:fill-white fill-black" width="100%" height="100%" style="mask: url(#topAdvisoryText)" />
			</svg>
			<advisorySVG letter-space="0.18rem">aaaa </advisorySVG>
			<svg
				width="100"
				height="16"
				class="z-10 bg-transparent text-[1rem] tracking-[0.05rem] basis-1/3 dark:text-white text-black scale-y-150"
				xmlns="http://www.w3.org/2000/svg">
				<defs>
					<mask id="midAdvisoryText">
						<rect class="fill-black full" />
						<text x="51%" y="60%" dominant-baseline="middle" text-anchor="middle" class="fill-white">PERSONAL</text>
					</mask>
				</defs>
				<rect class="dark:fill-white fill-black" style="mask: url(#midAdvisoryText)" width="100%" height="100%" />
			</svg>
			<svg width="100" height="16" class="tracking-[0.1325rem] z-50 bg-transparent basis-1/3" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<mask id="bottomAdvisoryText">
						<rect class="fill-white full" />
						<text x="51%" y="60%" dominant-baseline="middle" text-anchor="middle">WELL-BEING</text>
					</mask>
				</defs>
				<rect class="dark:fill-white fill-black full" style="mask: url(#bottomAdvisoryText)" />
			</svg>
		</div>
		<div class="scale-75 translate-x-[-12.5%] translate-y-[12.5%] sm:scale-100 sm:translate-x-0 sm:translate-y-0">
			<div
				class="relative flex justify-center overflow-hidden bg-transparent duration-[2000ms] max-sm:h-0 max-sm:w-full max-sm:items-start max-sm:group-hover/advisory:h-10 sm:h-full sm:w-0 sm:items-center sm:justify-end sm:group-hover/advisory:w-full">
				<div
					class="mx-[10px] flex flex-row text-nowrap text-[27px] text-white dark:text-[#370037] dark:drop-shadow-[0px_0px_10px_white] drop-shadow-[0px_0px_10px_black] font-['Oswald']">
					<div id="advisoryMain">Thời gian bảo trì:</div>
					<span id="advisoryDays" class="pl-[5px]"></span>:<span id="advisoryHours"></span>:<span id="advisoryMinutes"></span>:<span
						id="advisorySeconds"></span>
					<div class="pl-[5px]">giây</div>
				</div>
				<svg class="absolute -z-50 bg-transparent full" xmlns="http://www.w3.org/2000/svg">
					<foreignObject width="100%" height="100%">
						<iframe title="binaryBackground" src="" class="full bg-white/[.32]" frameborder="0"></iframe>
					</foreignObject>
				</svg>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
	import advisorySVG from '../elements/advisorySVG.vue';

	export default {
		components: {
			advisorySVG,
		},
	};
</script>
