import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        login: resolve(__dirname, "src/login.html"),
        register: resolve(__dirname, "src/register.html"),
        dashboard: resolve(__dirname, "src/dashboard.html"),
        // Add more pages as you build them
      },
    },
  },
});
