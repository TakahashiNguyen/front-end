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
				:checked="variables.isDarking !== isSystemDark"
				class="ds-theme-controller"
				@change="toggleDarkMode"
			/>
			<RiMoonLine
				class="w-10 h-10"
				:class="{
					'ds-swap-on': !isSystemDark,
					'ds-swap-off': isSystemDark,
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
	import { RiSunLine, RiMoonLine } from 'vue-remix-icons';
	import { availableLanguages } from '../../languages';
	import { variablesStore } from '@st/variables';

	export default {
		setup() {
			const isSystemDark = ref(
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
				),
				tolgee = useTolgee(['language']),
				variables = variablesStore();

			return { tolgee, isSystemDark, availableLanguages, variables };
		},
		mounted() {
			this.variables.isDarking =
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		},
		components: { RiSunLine, RiMoonLine, T },
		methods: {
			changeLang(e: Event) {
				this.tolgee.changeLanguage((e.target! as HTMLSelectElement).value);
			},
			flag(lang: string) {
				lang = lang.substring(lang.length - 2).toUpperCase();
				return ' ' + emojiFlags.countryCode(lang)?.emoji;
			},
			toggleDarkMode(e: Event) {
				this.variables.isDarking =
					(e.target as HTMLInputElement).checked !== this.isSystemDark;
				document
					.querySelector('html')!
					.setAttribute('class', this.variables.isDarking ? 'dark' : 'light');
				document
					.querySelector('html')!
					.setAttribute('data-theme', this.variables.isDarking ? 'dark' : 'light');
			},
		},
	};
</script>
