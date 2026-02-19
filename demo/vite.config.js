import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(() => {
  console.log("PAGES ALIAS =", path.resolve("src/pages"));

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve("src"),
        "@pages": path.resolve("src/pages"),
        "@components": path.resolve("src/components"),
        "@styles": path.resolve("src/styles"),
        "@fe-components": path.resolve("../src"),
      },
    },
  };
});
