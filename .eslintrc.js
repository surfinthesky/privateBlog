module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    "vue/multi-word-component-names": "off",
  },
  extends: ["eslint:recommended", "plugin:vue/base"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {},
};
