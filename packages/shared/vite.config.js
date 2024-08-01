import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outputDir: "dist/types",
      entryRoot: resolve(__dirname, "src"),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "SharedLibrary",
      formats: ["es"],
      fileName: (format) => `shared-library.${format}.js`,
    },
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.ts"),
        "components/Button": resolve(__dirname, "src/components/Button.tsx"),
        "utils/translation": resolve(__dirname, "src/utils/translation.ts"),
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
      treeshake: true,
      external: ["react", "react-dom"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
