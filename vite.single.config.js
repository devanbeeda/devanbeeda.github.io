import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Builds the whole site (JS, CSS, photo) into ONE html file that opens by double-click.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: { outDir: 'preview-build', emptyOutDir: true, assetsInlineLimit: 100000000 },
});
