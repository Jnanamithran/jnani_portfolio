/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'Arial', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        canvas: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: {
          DEFAULT: 'var(--accent)',
          contrast: 'var(--accent-contrast)',
        },
        paper: '#F5F0E6',
        bone: '#FFFCF5',
        ink: '#25231F',
      },
      spacing: {
        page: 'var(--space-page)',
        section: 'var(--space-section)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
      },
      transitionTimingFunction: {
        editorial: 'var(--ease-editorial)',
      },
    },
  },
  plugins: [],
};
