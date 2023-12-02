/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utiliry/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        diamond: '#ffffff',
        platinum: '#e5e4e2',
        gold: '#ffd700',
        silver: '#c0c0c0',
        bronze: '#cd7f32',
        opal: '#a9ffff',
      },
    },
  },
  plugins: [],
}

