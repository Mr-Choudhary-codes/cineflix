/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Standard React app files
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-dark': '#141414', // Main background
        'netflix-gray': '#808080', // Secondary text
        'netflix-light-gray': '#222222', // Card backgrounds, borders
      }
    },
  },
  plugins: [],
}
