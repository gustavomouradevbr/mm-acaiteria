/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-grape': '#4E3A4C',
        'amethyst': '#9750AF',
        'coffee-bean': '#140B11',
        'toffee-brown': '#89675A',
        'black-forest': '#273C1B',
        'black': '#050704',
        'dark-walnut': '#5A3423',
        'velvet-orchid': '#593477',
        'olive-leaf': '#575928',
        'olive-wood': '#866B33',
      }
    },
  },
  plugins: [],
}