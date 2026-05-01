import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    return {
        plugins: [react()],
        build: {
            target: "es2019",
            minify: "esbuild",
            sourcemap: false,
        },
        define: {
            __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
        },
    };
});
