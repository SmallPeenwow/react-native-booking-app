/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./components/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'main-color': '#0085FF',
			},
			boxShadow: {
				'button-shadow': '0px 4px 4px rgba(0, 0, 0, 0.25)',
			},
		},
	},
	plugins: [],
};
