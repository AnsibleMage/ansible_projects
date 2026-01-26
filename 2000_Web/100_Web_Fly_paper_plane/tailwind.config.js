/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        game: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'roblox-blue': '#0066FF',
        'roblox-green': '#00FF00',
      },
    },
  },
  plugins: [],
}
