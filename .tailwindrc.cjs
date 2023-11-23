const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./**/*.{svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#6366f1",
        success: "#22c55e",
        info: "#3b82f6",
        warning: "#eab308",
        danger: "#ef4444",
        background: "#ebf0f1",
        foreground: "#ffffff",
        content: "#032830",
      },
    },
  },
  variants: {
    extend: {},
  },
  safelist: [],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio")],
};
