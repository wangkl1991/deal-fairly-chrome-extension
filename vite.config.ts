import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'copy-manifest',
      buildEnd() {
        if (!existsSync('dist')) {
          mkdirSync('dist', { recursive: true });
        }
        copyFileSync('public/manifest.json', 'dist/manifest.json');
      }
    }
  ],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        options: resolve(__dirname, 'src/pages/options/index.html'),
        background: resolve(__dirname, 'src/pages/background/index.ts'),
        content: resolve(__dirname, 'src/pages/content/index.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          return `src/pages/${chunk.name}/index.js`;
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}); 