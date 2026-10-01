/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          royal: '#0d65fd',
          deep: '#032069',
          ambient: '#1e50bc',
          dark: '#05070d',
          charcoal: '#0b0f19',
          tealAccent: '#2d6a68',
        },
      },
      boxShadow: {
        glass: '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
        glow: '0 0 45px -5px rgba(13, 101, 253, 0.45)',
        'neon-blue': '0 0 25px rgba(13, 101, 253, 0.65), 0 0 50px rgba(37, 99, 235, 0.35)',
      },
      backdropBlur: {
        '2xl': '30px',
      },
    },
  },
  plugins: [],
}
