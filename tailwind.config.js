
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSmoothing: ['hover', 'focus'],
    fontWeight: {
      'extra-light': 100,
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      'extra-bold': 800,
      black: 900,
    },
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      normal: '0',
      wider: '.05em',
      widest: '.25em',
    }
  },
  fontFamily: {
    sans: ['Graphik', 'sans-serif'],
    serif: ['Merriweather', 'serif'],
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
