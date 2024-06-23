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
								<svg
									class="fill-current w-10 h-10"
									:class="{ 'ds-swap-off': !isSystemDark, 'ds-swap-on': isSystemDark }"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<path
										d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
									/>
								</svg>
								<svg
									class="fill-current w-10 h-10"
									:class="{ 'ds-swap-off': isSystemDark, 'ds-swap-on': !isSystemDark }"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<path
										d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
									/>
								</svg>
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
								<a>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										class="fill-current"
									>
										<path
											d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
										></path>
									</svg>
								</a>
								<a>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										class="fill-current"
									>
										<path
											d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
										></path>
									</svg>
								</a>
								<a>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										class="fill-current"
									>
										<path
											d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
										></path>
									</svg>
								</a>
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
										<svg
											class="fill-current w-10 h-10"
											:class="{
												'ds-swap-off': !isSystemDark,
												'ds-swap-on': isSystemDark,
											}"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
										>
											<path
												d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
											/>
										</svg>
										<svg
											class="fill-current w-10 h-10"
											:class="{
												'ds-swap-off': isSystemDark,
												'ds-swap-on': !isSystemDark,
											}"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
										>
											<path
												d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
											/>
										</svg>
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
