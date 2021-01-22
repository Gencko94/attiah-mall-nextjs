module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    ringWidth: false,
    outline: false,
  },
  theme: {
    extend: {
      colors: {
        'main-color': '#b72b2b',
        'main-text': '#fff',
        'body-light': '#fff',
        'body-text-light': '#252525',
        'first-nav-light': '#252525',
        'first-nav-text-light': '#fff',
        'first-nav-dark': '#b72b2b',
        'first-nav-text-dark': '#fff',
      },
      maxWidth: {
        default: '1440px',
      },
      screens: {
        xs: '320px',
        xxl: '1440px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
