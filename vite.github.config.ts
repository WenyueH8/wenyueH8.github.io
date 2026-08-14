import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL("./github-pages", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  base: "/",
  plugins: [
    {
      name: "github-pages-portfolio-css",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith("/app/globals.css")) {
          return code.replace('@import "tailwindcss";', "");
        }
      },
    },
    react(),
  ],
  build: {
    outDir: fileURLToPath(new URL("./dist-github", import.meta.url)),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
});
