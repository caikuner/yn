import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs-extra'

// copy vs
fs.copySync(
  path.resolve(__dirname, 'node_modules/monaco-editor/min/vs'),
  path.resolve(__dirname, 'src/renderer/public/vs')
)


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: 'src/renderer',
  server: {
    port: 8066,
    proxy: {
      '/static': {
        target: 'http://localhost:3044'
      },
      '/api': {
        target: 'http://localhost:3044'
      },
      '/ws': {
        target: 'http://localhost:3044',
        ws: true
      }
    }
  },
  resolve: {
    alias: [
      { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' },
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
      { find: /^@fe\//, replacement: path.resolve(__dirname, 'src', 'renderer') + '/' },
    ]
  },
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
  }
})
