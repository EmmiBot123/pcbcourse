/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0c0f17',
          850: '#111520',
          800: '#171c2b',
          700: '#232a3f',
          600: '#2f3852',
        },
        brand: {
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          primaryHover: 'rgb(var(--brand-primary-hover) / <alpha-value>)',
          primarySubtle: 'rgb(var(--brand-primary-subtle) / <alpha-value>)',
          primaryBorder: 'rgb(var(--brand-primary-border) / <alpha-value>)',
          primaryText: 'rgb(var(--brand-primary-text) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
          accentText: 'rgb(var(--brand-accent-text) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
