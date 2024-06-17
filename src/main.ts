import './scss/style.scss';
import './scss/scrollbar.scss';
import './scss/fonts.scss';
import '../types';
import App from './App.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import BootstrapTest from './components/BootstrapTest.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vue-router section
const routes = [{ path: '/', component: BootstrapTest }];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('body');
