module.exports = {
  root: true,
  // extends: airbnb-base,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: eslint,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: module
  },
};
