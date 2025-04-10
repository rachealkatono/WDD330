// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // Your index.html is at the root
  build: {
    outDir: 'dist', // Output folder after build
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
});
