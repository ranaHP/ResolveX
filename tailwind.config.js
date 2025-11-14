/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f1ff',
          100: '#cfe2ff',
          200: '#9fc5ff',
          300: '#6ea7ff',
          400: '#3e8aff',
          500: '#0e6dff',
          600: '#0b57cc',
          700: '#084199',
          800: '#052b66',
          900: '#031533'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
