/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border_color: '#dee2e6',
        dark_green: '#181826',
      },
      fontFamily: {
        monteserat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
