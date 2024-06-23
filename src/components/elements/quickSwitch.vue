<style scoped>
	.flag {
		font-family: Arial, Helvetica, sans-serif, 'Twemoji Country Flags';
	}
</style>
<template>
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
</template>

<script lang="ts">
	import { T, useTolgee } from '@tolgee/vue';
	import emojiFlags from 'emoji-flags';
	import { ref } from 'vue';
	import { RiSunLine, RiContrast2Line } from 'vue-remix-icons';
	import { availableLanguages } from '../../languages';

	export default {
		setup() {
			const isDarkMode = ref(
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
				),
				isSystemDark = ref(
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
				),
				tolgee = useTolgee(['language']);

			return { tolgee, isDarkMode, isSystemDark, availableLanguages };
		},
		components: { RiSunLine, RiContrast2Line, T },
		methods: {
			changeLang(e: Event) {
				this.tolgee.changeLanguage((e.target! as HTMLSelectElement).value);
			},
			flag(lang: string) {
				lang = lang.substring(lang.length - 2).toUpperCase();
				return ' ' + emojiFlags.countryCode(lang)?.emoji;
			},
			toggleDarkMode() {
				this.isDarkMode = !this.isDarkMode;
				document
					.querySelector('html')!
					.setAttribute('class', this.isDarkMode ? 'dark' : 'light');
				document
					.querySelector('html')!
					.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
			},
		},
	};
</script>
