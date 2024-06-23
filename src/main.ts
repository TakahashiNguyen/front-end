import './scss/style.scss';
import './scss/scrollbar.scss';
import 'unfonts.css';
import App from './App.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import BootstrapTest from './components/BootstrapTest.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import HelloWorld from './components/HelloWorld.vue';
import { Tolgee, DevTools, VueTolgee, LanguageDetector } from '@tolgee/vue';
import { FormatIcu } from '@tolgee/format-icu';
import { availableLanguages } from './languages';

// Vue-router section
const routes = [
	{ path: '/', component: BootstrapTest },
	{ path: '/about', component: HelloWorld },
];

const router = createRouter({
	history: createMemoryHistory(),
	routes,
});

// tolgee section
const tolgee = Tolgee()
	.use(DevTools())
	.use(FormatIcu())
	.use(LanguageDetector())
	.init({
		availableLanguages: availableLanguages,
		defaultLanguage: availableLanguages[0],

		// for development
		apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
		apiKey: import.meta.env.VITE_TOLGEE_API_KEY,

		// import namespace
		ns: ['tabs', 'advisory', 'lang'],
	});

const pinia = createPinia();
createApp(App).use(VueTolgee, { tolgee }).use(pinia).use(router).mount('body');
