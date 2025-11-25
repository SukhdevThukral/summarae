import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        content: resolve(__dirname, 'src/content/content.ts'),
        background: resolve(__dirname, 'src/background/background.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'content') return 'content/content.js';
          if (chunk.name === 'background') return 'background.js';
          if (chunk.name === 'popup') return 'popup/popup.js';
          return '[name].js'
        },
        assetFileNames: (asset) => {
          if (asset.name?.endsWith('.css')) return 'popup/[name].[ext]';
            return '[name].[ext]'
          },
        chunkFileNames: (chunk) => {
          if (chunk.name === "popup") return "popup/popup.js";
          return '[name].js';
        }
      }
    }
  }
});
