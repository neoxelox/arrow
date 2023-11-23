module.exports = {
  root: true,
  env: { es6: true, browser: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["svelte3", "@typescript-eslint", "prettier"],
  rules: {
    "no-console": "error",
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  settings: {
    "svelte3/typescript": true,
  },
};
