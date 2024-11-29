/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
		colors: {
			'ccol-0': '#EEF0F2',
			'ccol-1': '#C6C7C4',
			'ccol-2': '#A2999E',
			'ccol-3': '#846A6A',
			'ccol-4': '#353B3C',
		},
    extend: {
      width: {
        '400px': '400px',
      }
		},
  },
  plugins: [],
}
