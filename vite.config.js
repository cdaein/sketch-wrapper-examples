/**
 * this config is for enabling mp4 export in browser.
 * https://github.com/amandaghassaei/canvas-capture#caveats
 */

import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["ogl-typescript"],
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
