import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input:
                "resources/js/app.jsx",
                // "resources/assets/scss/theme.scss",
            refresh: true,
        }),
        react(),
    ],
});
