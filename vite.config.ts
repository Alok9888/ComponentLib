import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ base: './', plugins: [react()], css: { preprocessorOptions: { scss: { quietDeps: true } } }, build: { outDir: 'demo-dist' } });
