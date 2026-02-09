import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Add this import

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // This forces Swiper and your app to share the exact same React instance
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
