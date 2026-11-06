/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070709',
          900: '#0c0c0e',
          850: '#121215',
          800: '#18181c',
          700: '#232329',
          600: '#2f2f37',
        },
        luxury: {
          gold: '#c99a53',
          amber: '#e58e37',
          silver: '#e2e4e9',
          chrome: '#f8f9fa'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'sans-serif'],
        display: ['Syne', 'Montserrat', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        tighter: '-.04em'
      }
    },
  },
  plugins: [],
}
