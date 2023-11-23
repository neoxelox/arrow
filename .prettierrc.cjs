module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  endOfLine: "auto",
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  plugins: ["prettier-plugin-svelte"],
};
