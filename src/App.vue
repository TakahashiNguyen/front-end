<script lang="ts">
	import { ref } from 'vue';

	const isDarkMode = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

	export default {
		setup() {
			const toggleDarkMode = () => {
				isDarkMode.value = !isDarkMode.value;
				document.querySelector('html')?.setAttribute('data-bs-theme', isDarkMode.value ? 'dark' : 'light');
			};

			return { toggleDarkMode };
		},
	};
</script>

<template>
	<nav>
		<RouterLink to="/">Go to Home</RouterLink>
		<RouterLink to="/about">Go to About</RouterLink>
		<button @click="toggleDarkMode">Dark</button>
	</nav>

	<main>
		<RouterView />
	</main>
</template>

<style scoped lang="scss"></style>
