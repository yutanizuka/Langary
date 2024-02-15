import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel(["resources/css/app.css", "resources/js/app.js"]),
        react(),
    ],

    resolve: {
        alias: {
            "@": resolve(__dirname, "./resources/js"),
        },
    },
    server: {
        watch: {
            // ポーリングを使用してファイルの変更を検出
            usePolling: true,
            // ポーリング間隔（ミリ秒）
            interval: 100,
            port: 4000,
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "./resources/js/Pages/Index.jsx"),
                another: resolve(__dirname, "./resources/js/Pages/Welcome.jsx"),
            },
        },
    },
});
