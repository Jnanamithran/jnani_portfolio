/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Bebas Neue"', 'cursive'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'body': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f7f7f5',
          100: '#eeede9',
          200: '#d9d7d0',
          300: '#b8b5ab',
          400: '#928f84',
          500: '#76736a',
          600: '#605d55',
          700: '#4e4c46',
          800: '#42403c',
          900: '#3a3835',
          950: '#1c1b18',
        },
        paper: '#f5f4f0',
        bone: '#e8e6e1',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
