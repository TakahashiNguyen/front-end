/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import * as defaultTheme from 'tailwindcss/defaultTheme';

export default {
	darkMode: [
		'variant',
		['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)'],
	],
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			nickName: ['AnonymousPro', ...defaultTheme.fontFamily.sans],
			hashTag: ['JetBrainsMono', ...defaultTheme.fontFamily.mono],
		},
		extend: {
			keyframes: {
				slide: {
					'25%': { transform: 'translateX(13%) scale(1.4);' },
					'75%': { transform: 'translateX(-13%) scale(1.4);' },
				},
				shake: {
					'10%': { transform: 'translate(-3px, 0px) rotate(1deg);' },
					'20%': { transform: 'translate(-1px, -2px) rotate(-1deg);' },
					'30%': { transform: 'translate(3px, 2px) rotate(0deg);' },
					'40%': { transform: 'translate(1px, -1px) rotate(1deg);' },
					'50%': { transform: 'translate(-1px, 2px) rotate(-1deg);' },
					'60%': { transform: 'translate(-3px, 1px) rotate(0deg);' },
					'70%': { transform: 'translate(3px, 1px) rotate(-1deg);' },
					'80%': { transform: 'translate(-1px, -1px) rotate(1deg);' },
					'90%': { transform: 'translate(1px, 2px) rotate(0deg);' },
					'100%': { transform: 'translate(1px, -2px) rotate(-1deg);' },
				},
			},
			animation: {
				slide: 'slide 66.6s ease-in-out infinite',
				shake: 'shake 0.6s ease-out 13',
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: false, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: 'ds-', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
