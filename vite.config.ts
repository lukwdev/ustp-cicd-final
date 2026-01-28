// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc"; // Back to just SWC
import { defineConfig, PluginOption } from "vite";
import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path';

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname;

export default defineConfig({
    // CONDITIONAL BASE PATH:
    // Use the repository name when running in GitHub Actions (CI/CD),
    // but use the default '/' for local development.
    base: process.env.GITHUB_ACTIONS ? "/ustp-cicd-final/" : "/",

    plugins: [
        react(),
        tailwindcss(),
        createIconImportProxy() as PluginOption,
        sparkPlugin() as PluginOption,
    ],
    resolve: {
        alias: {
            '@': resolve(projectRoot, 'src')
        }
    },
    test: {
        globals: true,
        // We can use 'node' instead of 'jsdom' for pure logic tests
        // This makes tests much faster and removes browser-related errors
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
    },
});