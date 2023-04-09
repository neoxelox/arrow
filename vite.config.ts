import htmlMinimize from "@sergeymakinen/vite-plugin-html-minimize"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import { visualizer } from "rollup-plugin-visualizer"
import sveltePreprocess from "svelte-preprocess"
import tailwindcss from "tailwindcss"
import { defineConfig } from "vite"
import viteCompression from "vite-plugin-compression"
import { viteSingleFile } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        postcss: true,
      }),
    }),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
    // @ts-expect-error: HTML minimize exports the plugin function in a default property
    htmlMinimize.default({
      minifierOptions: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        html5: true,
        keepClosingSlash: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    viteCompression({
      algorithm: "gzip",
      deleteOriginFile: true,
    }),
    visualizer({ gzipSize: true, open: true }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer(), cssnano()],
    },
  },
})
