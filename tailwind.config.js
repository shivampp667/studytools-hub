/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          accent: '#38BDF8',
          navy: '#0F172A',
        },
        surface: {
          light: '#FFFFFF',
          muted: '#F6F9FC',
          border: '#E2E8F0',
          dark: '#0B1120',
          'dark-card': '#111827',
          'dark-border': '#263244',
        }
      },
    },
  },
  plugins: [],
}
