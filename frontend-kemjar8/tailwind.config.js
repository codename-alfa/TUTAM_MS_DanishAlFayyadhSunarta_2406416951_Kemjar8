/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-10': '#101010',
        'black-15': '#151515',
        'black-20': '#202020',
        'black-25': '#252525',
        'black-30': '#303030',
        'kemjar-ijo': '#00FF66',
        'kemjar-biru': '#0576DF',
      }
    },
  },
  plugins: [],
}