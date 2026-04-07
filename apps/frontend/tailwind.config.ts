import type { Config } from 'tailwindcss';

export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#2e7d32',
					sky: '#38bdf8',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
