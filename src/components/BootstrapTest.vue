<script setup lang="ts"></script>

<template>
	<div class="container py-4 px-3 mx-auto">
		<h1>Hello, Bootstrap and Vite!</h1>
		<button class="ds-btn ds-btn-primary">Primary button</button>
	</div>

	<div class="ds-dropdown">
		<button
			class="btn btn-primary dropdown-toggle"
			type="button"
			data-bs-toggle="dropdown"
			aria-expanded="true"
		>
			Dropdown button
		</button>
		<ul class="dropdown-menu">
			<li><a class="ds-dropdown-content" href="#">Action</a></li>
			<li><a class="dropdown-item" href="#">Another action</a></li>
			<li><a class="dropdown-item" href="#">Something else here</a></li>
		</ul>
	</div>
</template>

<style scoped></style>
