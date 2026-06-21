/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0faf0',
          100: '#dcf5dc',
          200: '#b6eab6',
          300: '#7dd87d',
          400: '#4aba4a',
          500: '#2d9e2d',
          600: '#1f7e1f',
          700: '#186318',
          800: '#164f16',
          900: '#114211',
        },
        leaf: '#22c55e',
        sage: '#86efac',
        moss: '#166534',
        mist: '#f0fdf4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      }
    },
  },
  plugins: [],
}
