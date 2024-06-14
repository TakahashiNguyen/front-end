import { createApp } from 'vue';
import './scss/style.scss';
import App from './App.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import BootstrapTest from './components/BootstrapTest.vue';
import 'bootstrap';

// Vue-router section
const routes = [{ path: '/', component: BootstrapTest }];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

createApp(App).use(router).mount('#app');
