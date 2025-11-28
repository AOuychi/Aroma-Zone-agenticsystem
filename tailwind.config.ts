import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aroma-green': {
          light: '#e8f5e9',
          DEFAULT: '#6c8f6a',
          dark: '#4a6c48',
        },
        'aroma-beige': '#f4f1ea',
        'aroma-white': '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'aroma': '12px',
      },
    },
  },
  plugins: [],
}
export default config

