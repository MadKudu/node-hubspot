module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    // 'plugin:mocha/recommended',
    // 'plugin:lodash/recommended',
    // 'plugin:promise/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prefer-arrow',
    // 'mocha'
  ],
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  rules: {
    'prefer-arrow-callback': 2,
    'prefer-template': 2,
    'no-template-curly-in-string': 2,
    'newline-per-chained-call': 2,
  },
}
