import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:7001/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
