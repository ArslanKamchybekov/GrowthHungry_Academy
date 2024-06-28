module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2022, // Equivalent to 13
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "error",
    "eqeqeq": ["error", "always"],
  },
};