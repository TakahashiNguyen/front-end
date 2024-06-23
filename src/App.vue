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
	.flag {
		font-family: Arial, Helvetica, sans-serif, 'Twemoji Country Flags';
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
						<div
							class="rounded-full scale-[70%]"
							@click="
								myName!.scrollIntoView({
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
							to="/about"
							role="tab"
							class="ds-tab"
							active-class="ds-tab-active"
						>
						</RouterLink>
						<RouterLink to="/me" role="tab" class="ds-tab" active-class="ds-tab-active">
							Tab 3
						</RouterLink>
					</div>
					<div class="md:flex md:flex-row-reverse items-center hidden">
						<select
							:value="tolgee.getLanguage()"
							@change="changeLang"
							class="ds-select ds-select-bordered ds-select-sm flag"
						>
							<option v-for="l in availableLanguages" :key="l" :value="l">
								<T :key-name="l" ns="lang" :params="{ emoji: flag(l) }" />
							</option>
						</select>
						<div class="ds-btn ds-btn-ghost ds-btn-square ds-btn-sm flex flex-nowrap">
							<label class="ds-swap ds-swap-rotate scale-75">
								<input
									type="checkbox"
									class="ds-theme-controller"
									value="synthwave"
									@click="toggleDarkMode"
								/>
								<RiContrast2Line
									class="w-10 h-10"
									:class="{
										'ds-swap-off': isSystemDark,
										'ds-swap-on': !isSystemDark,
									}"
								/>
								<RiSunLine
									class="w-10 h-10"
									:class="{
										'ds-swap-on': isSystemDark,
										'ds-swap-off': !isSystemDark,
									}"
								/>
							</label>
						</div>
					</div>
				</nav>

				<main class="h-content">
					<RouterView />
					<footer class="ds-footer items-center p-4 dark:bg-neutral bg-neutral-content">
						<aside class="items-center grid-flow-col">
							<div class="ds-avatar ds-btn ds-btn-circle ds-btn-ghost block md:hidden">
								<div
									class="rounded-full scale-[70%]"
									@click="
										myName!.scrollIntoView({
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
								<select
									:value="tolgee.getLanguage()"
									@change="changeLang"
									class="ds-select ds-select-bordered ds-select-sm flag"
								>
									<option v-for="l in availableLanguages" :key="l" :value="l">
										<T :key-name="l" ns="lang" :params="{ emoji: flag(l) }" />
									</option>
								</select>
								<div class="ds-btn ds-btn-ghost ds-btn-square ds-btn-sm flex flex-nowrap">
									<label class="ds-swap ds-swap-rotate scale-75">
										<input
											type="checkbox"
											class="ds-theme-controller"
											value="synthwave"
											@click="toggleDarkMode"
										/>
										<RiContrast2Line
											class="w-10 h-10"
											:class="{
												'ds-swap-off': isSystemDark,
												'ds-swap-on': !isSystemDark,
											}"
										/>
										<RiSunLine
											class="w-10 h-10"
											:class="{
												'ds-swap-on': isSystemDark,
												'ds-swap-off': !isSystemDark,
											}"
										/>
									</label>
								</div>
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
	import LoadingPane from './components/core/loadingPane.vue';
	import SlidingBackgroundImage from './components/core/slidingBackgroundImage.vue';
	import { TolgeeProvider } from '@tolgee/vue';
	import { T } from '@tolgee/vue';
	import emojiFlags from 'emoji-flags';
	import { availableLanguages } from './languages';
	import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
	import { useTolgee } from '@tolgee/vue';
	import {
		RiContrast2Line,
		RiFacebookFill,
		RiSunLine,
		RiTwitchFill,
		RiYoutubeFill,
	} from 'vue-remix-icons';

	const isDarkMode = ref(
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
		),
		isSystemDark = ref(
			window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
		),
		hashTag = 'new?';

	polyfillCountryFlagEmojis();

	export default {
		setup() {
			document.body!.setAttribute(
				'class',
				'dark:text-white text-black dark:bg-black bg-white',
			);
			document.body?.setAttribute('style', 'color-scheme: normal');

			const myName = ref<HTMLElement>(),
				tabMain = ref<HTMLElement>(),
				tolgee = useTolgee(['language']);

			return {
				isSystemDark,
				availableLanguages,
				hashTag,
				myName,
				tabMain,
				tolgee,
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
			RiSunLine,
			RiContrast2Line,
		},
		mounted() {},
		methods: {
			changeLang(e: Event) {
				this.tolgee.changeLanguage((e.target! as HTMLSelectElement).value);
			},
			flag(lang: string) {
				lang = lang.substring(lang.length - 2).toUpperCase();
				return ' ' + emojiFlags.countryCode(lang)?.emoji;
			},
			toggleDarkMode() {
				isDarkMode.value = !isDarkMode.value;
				document
					.querySelector('html')!
					.setAttribute('class', isDarkMode.value ? 'dark' : 'light');
				document
					.querySelector('html')!
					.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
			},
		},
		computed: {
			cssVars() {
				return {
					'--nav-height': '3rem',
				};
			},
		},
	};
</script>
