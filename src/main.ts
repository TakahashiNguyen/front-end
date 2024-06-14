import { createApp } from 'vue';
import './scss/style.scss';
import App from './App.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import BootstrapTest from './components/BootstrapTest.vue';

// Vue-router section
const routes = [{ path: '/', component: BootstrapTest }];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

// Custom function for types
declare global {
	interface Array<T> {
		random(): Array<T>;
	}
	interface String {
		getElement(): HTMLElement;
	}
}

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};
String.prototype.getElement = function () {
	return document.getElementById(String(this))!;
};

createApp(App).use(router).mount('#app');
