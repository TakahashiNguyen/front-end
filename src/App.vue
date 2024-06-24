<style scoped lang="scss">
	.blurBackground {
		@apply bg-white/[.64] dark:bg-black/[.64];
	}
	.scrollContainer {
		@apply flex h-dvh w-screen flex-col flex-nowrap;
		overflow: auto;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}
	.scrollItems {
		@apply h-screen w-screen;
		scroll-snap-align: start;
	}
	.h-content {
		height: calc(100vh - var(--nav-height));
		@apply bg-white/[.32] dark:bg-black/[.32];
		backdrop-filter: blur(1vw);
	}
	.h-nav {
		height: var(--nav-height);
	}
</style>

<template>
	<TolgeeProvider>
		<LoadingPane v-slot:fallback ref="loadingPane" />

		<div class="scrollContainer" :style="cssVars">
			<div class="scrollItems" ref="myName">
				<SlidingBackgroundImage :hashTag="hashTag" />
			</div>

			<div class="scrollItems">
				<nav class="bg-white dark:bg-black h-nav justify-between flex px-3" ref="navBar">
					<div class="ds-avatar ds-btn ds-btn-circle ds-btn-ghost hidden md:block">
						<BackToTop :to="myName!" />
					</div>
					<div
						role="tablist"
						class="ds-tabs ds-tabs-lifted ds-tabs-md md:ds-tabs-lg"
						ref="tabMain"
					>
						<RouterLink to="/" role="tab" class="ds-tab" active-class="ds-tab-active">
							<T key-name="introduce" ns="tabs" />
						</RouterLink>
						<RouterLink
							to="/latestWork"
							role="tab"
							class="ds-tab"
							active-class="ds-tab-active"
						>
							<T key-name="latestWork" ns="tabs" />
						</RouterLink>
						<RouterLink
							to="/interests"
							role="tab"
							class="ds-tab"
							active-class="ds-tab-active"
						>
							<T key-name="interests" ns="tabs" />
						</RouterLink>
					</div>
					<div class="md:flex md:flex-row-reverse items-center hidden">
						<QuickSwitch />
					</div>
				</nav>

				<main class="h-content">
					<RouterView />
					<footer class="ds-footer items-center p-4 dark:bg-neutral bg-neutral-content">
						<aside class="items-center grid-flow-col">
							<div class="ds-avatar ds-btn ds-btn-circle ds-btn-ghost block md:hidden">
								<BackToTop :to="myName!" />
							</div>
							<p>NoCopyright - All right irreserved</p>
						</aside>
						<nav class="md:flex-row-reverse w-full justify-between flex">
							<div
								class="grid grid-flow-col gap-4 md:place-self-center md:justify-self-end"
							>
								<RiTwitchFill class="w-8 h-8" />
								<RiYoutubeFill class="w-8 h-8" />
								<RiFacebookFill class="w-8 h-8" />
							</div>
							<div class="flex flex-row-reverse items-center md:hidden">
								<QuickSwitch />
							</div>
						</nav>
					</footer>
				</main>
			</div>
		</div>
	</TolgeeProvider>
</template>

<script lang="ts">
	import { ref } from 'vue';
	import './ts/plugins/types';
	import LoadingPane from '@cp/core/loadingPane.vue';
	import SlidingBackgroundImage from '@cp/core/slidingBackgroundImage.vue';
	import { TolgeeProvider } from '@tolgee/vue';
	import { T } from '@tolgee/vue';
	import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
	import { RiFacebookFill, RiTwitchFill, RiYoutubeFill } from 'vue-remix-icons';
	import QuickSwitch from '@cp/elements/quickSwitch.vue';
	import BackToTop from '@cp/elements/backToTop.vue';

	const hashTag = 'new?';

	polyfillCountryFlagEmojis();

	export default {
		setup() {
			document.body!.setAttribute(
				'class',
				'dark:text-white text-black dark:bg-black bg-white',
			);
			document.body?.setAttribute('style', 'color-scheme: normal');

			const myName = ref<HTMLElement>(),
				tabMain = ref<HTMLElement>();

			return {
				hashTag,
				myName,
				tabMain,
			};
		},
		components: {
			LoadingPane,
			SlidingBackgroundImage,
			TolgeeProvider,
			T,
			RiYoutubeFill,
			RiFacebookFill,
			RiTwitchFill,
			QuickSwitch,
			BackToTop,
		},
		mounted() {},
		methods: {},
		computed: {
			cssVars() {
				return {
					'--nav-height': '3rem',
				};
			},
		},
	};
</script>
