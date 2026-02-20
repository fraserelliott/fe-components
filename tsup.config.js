import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"], // your real entry
  format: ["esm"],
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react/jsx-dev-runtime",
  ],

  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
  },
});
