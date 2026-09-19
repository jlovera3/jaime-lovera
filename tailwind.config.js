/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'media',
  theme: {
    screens: {
      sm: '576px',
      md: '960px',
      lg: '1440px',
    },
    colors: {
      white: colors.white,
    },
  },
  plugins: [require('tailwindcss-animated')],
};
