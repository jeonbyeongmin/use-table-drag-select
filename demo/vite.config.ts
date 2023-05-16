import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/use-table-drag-select/',
  plugins: [react()],
  build: {
    outDir: '../docs',
  },
});
