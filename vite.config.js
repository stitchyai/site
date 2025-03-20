import { defineConfig } from 'vite'

export default defineConfig({
  // Base path for production deployment
  base: '/',
  // Server options for development
  server: {
    port: 3000,
  },
  // Build options
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
})