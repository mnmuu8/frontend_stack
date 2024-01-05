/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legend: '#E0115F',
        master: '#4B0082',
        diamond: '#ADD8E6',
        platinum: '#C0C0E0',
        gold: '#ffd700',
        silver: '#c0c0c0',
        bronze: '#cd7f32',
      },
    },
  },
  plugins: [],
}

