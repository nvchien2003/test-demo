import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172026',
        line: '#d8dee4',
        surface: '#f7f9fb',
        accent: '#0f766e',
        danger: '#b42318',
      },
      boxShadow: {
        panel: '0 1px 2px rgb(15 23 42 / 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
