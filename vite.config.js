// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, tapi pastikan ini ada
  },
  server: {
    port: 5173,
    open: true,
  },
})
