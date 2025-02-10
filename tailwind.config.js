/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
		colors: {
			'ccol-0': '#eef0f2',
			'ccol-1': '#c6c7c4',
			'ccol-2': '#a2999e',
			'ccol-3': '#846a6a',
			'ccol-4': '#353b3c',
		},
    extend: {
      width: {
        '400px': '400px',
      }
		},
  },
  plugins: [],
}
