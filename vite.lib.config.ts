import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = dirname(fileURLToPath(import.meta.url));
export default defineConfig({ plugins: [react()], build: { outDir: resolve(root, 'dist'), emptyOutDir: false, lib: { entry: resolve(root, 'src/index.ts'), formats: ['es'], fileName: 'index' }, rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'], output: { assetFileNames: 'style.css' } }, cssCodeSplit: false } });
