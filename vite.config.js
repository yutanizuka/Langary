import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./resources/js"),
        },
    },
    build: {
        rollupOptions: {
            // プロジェクトのルートからの相対パスに修正
            input: {
                main: resolve(__dirname, "./resources/js/Pages/Index.jsx"),
                another: resolve(
                    __dirname,
                    "./resources/js/Pages/Dashboard.jsx"
                ),
            },
        },
    },
});
