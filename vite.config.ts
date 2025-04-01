import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Map @ to your src directory
    },
  },
  plugins: [react(), tailwindcss()],
  server:{
    port: 8686,
  }
});
