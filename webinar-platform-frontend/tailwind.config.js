/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui'],
        display: ['Outfit', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(59, 130, 246, 0.25)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top left, rgba(59,130,246,0.35), transparent 25%), radial-gradient(circle at top right, rgba(168,85,247,0.28), transparent 22%), radial-gradient(circle at bottom, rgba(236,72,153,0.18), transparent 28%)',
      },
    },
  },
  plugins: [],
}
