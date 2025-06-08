import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Remove tailwindcss() from plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Use path to resolve the src directory
    },
  },
});
