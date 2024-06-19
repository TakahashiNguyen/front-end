import './scss/style.scss';
import './scss/scrollbar.scss';
import 'unfonts.css';
import App from './App.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import BootstrapTest from './components/BootstrapTest.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import HelloWorld from './components/HelloWorld.vue';

// Vue-router section
const routes = [
	{ path: '/', component: BootstrapTest },
	{ path: '/about', component: HelloWorld },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('body');
