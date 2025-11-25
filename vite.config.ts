import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import type {Plugin, OutputBundle} from "rollup";


const renameHtmlPlugin = (): Plugin => {
  return{
    name: "rename-html",
    generateBundle(_options, bundle: OutputBundle){
      const htmlFile = Object.keys(bundle).find(k=>k.endsWith(".html"));
      if (!htmlFile) return;

      const file = bundle[htmlFile];
      if (file && file.type === "asset"){
        this.emitFile({
          type: "asset",
          fileName: "popup/index.html",
          source: file.source,
        });
        delete bundle[htmlFile];
      }
    },
  };
};

export default defineConfig({
  plugins: [react(), renameHtmlPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      preserveEntrySignatures: false,
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'), 
        content: resolve(__dirname, 'src/content/content.ts'),
        background: resolve(__dirname, 'src/background/background.ts'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'popup') return 'popup/popup.js'
          if (chunk.name === 'content') return 'content/content.js'
          if (chunk.name === 'background') return 'background.js'
          return '[name].js'
        },
        
        assetFileNames: (assetInfo) => {
          //html+css in popup folder
          if (assetInfo.name?.endsWith('.css')) 
            return 'popup/[name].[ext]';

          return "assets/[name].[ext]";
        },
      },
    },
  },
});
