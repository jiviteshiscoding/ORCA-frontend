/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orca: {
          env: '#BFE8F3',
          ice: '#EAF8FB',
          white: '#F8FCFD',
          navy: '#073B66',
          deep: '#062B4A',
          cyan: '#20B8D8',
          blue: '#1685C7',
        },
        decision: {
          go: '#10B981',
          caution: '#F59E0B',
          avoid: '#EF4444',
          unknown: '#6B7280',
        }
      }
    },
  },
  plugins: [],
};
