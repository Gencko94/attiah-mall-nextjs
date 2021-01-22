module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    // "plugin:react-hooks/recommended",
    // always put prettier at last
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // enable linting for jsx files
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // NextJs specific fix: suppress errors for missing 'import React' in files for nextjs
    'react/react-in-jsx-scope': 'off',
    // NextJs specific fix: allow jsx syntax in js files
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // should add ".ts" if typescript project
    'react/display-name': 1,
    'no-console': ['warn'],
    'react/prop-types': 'off',
    'no-unused-vars': ['warn'],
    'arrow-body-style': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/button-has-type': 'off',
    'react/jsx-one-expression-per-line': 'off',
    camelcase: 'off',
    'no-unneeded-ternary': 'off',
    'no-shadow': 'off',
    radix: 'off',
    'react/no-danger': 'off',
  },
};
