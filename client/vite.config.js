import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../server/public", // Ensure the build files are output to the server's public directory
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": "http://localhost:5001",
      "/graphql": "http://localhost:5001",
    },
  },
});
