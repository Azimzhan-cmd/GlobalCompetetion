/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kz-blue': 'var(--color-kz-blue, #00AFCA)',
        'kz-yellow': 'var(--color-kz-yellow, #FEC105)',
        'slate-950': '#090d16',
        'indigo-950': '#0d0e26',
        'deep-dark': '#0b0f19',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 175, 202, 0.2), 0 0 10px rgba(0, 175, 202, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 175, 202, 0.6), 0 0 35px rgba(0, 175, 202, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
