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
    build: {
        chunkSizeWarningLimit: 200,
        rollupOptions: {
            output:{
                manualChunks(id) {
                  if (id.includes('node_modules')) {
                      return id.toString().split('node_modules/')[1].split('/')[0].toString();
                  }
              }
            }
        }
    }
});
