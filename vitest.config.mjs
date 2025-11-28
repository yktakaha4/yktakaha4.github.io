"use strict";
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
var __dirname = path.dirname(new URL(import.meta.url).pathname);
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
        globalSetup: ['./src/test/globalSetup.ts'],
        setupFiles: ['src/test/setupFiles.ts'],
        include: ['src/**/*.{spec,test}.{ts,tsx}'],
        exclude: ['node_modules', 'build', 'e2e'],
        alias: {
            '@docusaurus/Link': path.resolve(__dirname, './src/test/LinkMock.tsx'),
            '@docusaurus/useDocusaurusContext': path.resolve(__dirname, './src/test/useDocusaurusContextMock.ts'),
            '@docusaurus/useBaseUrl': path.resolve(__dirname, './src/test/useBaseUrlMock.ts'),
        },
        coverage: {
            enabled: true,
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.{ts,tsx}'],
        },
    },
});
