import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

export default defineConfig({
  server: {
    open: true, // 自動でブラウザを開く
  },
  build: {
    outDir: "build", // ビルドの出力先ディレクトリ
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
});
