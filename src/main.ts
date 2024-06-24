import '@sc/style.scss';
import '@sc/scrollbar.scss';
import 'unfonts.css';
import App from './App.vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import BootstrapTest from '@cp/aboutMe.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import HelloWorld from '@cp/HelloWorld.vue';
import {
	Tolgee,
	DevTools,
	VueTolgee,
	LanguageDetector,
	TolgeeStaticData,
} from '@tolgee/vue';
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
function genI18NImports(paths: string[][]): TolgeeStaticData {
	return paths.reduce((acc, val: any) => {
		return {
			...acc,
			[`${val[0]}:${val[1]}`]: () => import(`./i18n/${val[1]}/${val[0]}.json`),
		};
	}, {} as TolgeeStaticData);
}

function generatePermutations<T>(arr1: T[], arr2: T[]): T[][] {
	const permutations: T[][] = [];
	arr1.forEach(e => arr2.forEach(i => permutations.push([e, i])));

	return permutations;
}

const namespace = ['tabs', 'advisory', 'lang'],
	tolgee = Tolgee()
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
			ns: namespace,

			// static
			staticData: genI18NImports(generatePermutations(availableLanguages, namespace)),
		});

const pinia = createPinia();
createApp(App).use(VueTolgee, { tolgee }).use(pinia).use(router).mount('body');
