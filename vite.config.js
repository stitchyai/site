import { defineConfig } from 'vite'
import { ViteCspPlugin } from 'vite-plugin-csp'

export default defineConfig({
  base: '/',
  
  server: {
    port: 3000,
  },
  
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  },
  
  plugins: [
    ViteCspPlugin({
      // Add nonce to script and style tags
      nonceEnabled: {
        'script-src': true,
        'style-src': true
      },
      // Define your CSP policy
      policy: {
        'default-src': ["'self'"],
        // Allow unsafe-inline in development mode
        'script-src': process.env.NODE_ENV === 'production' 
          ? ["'self'"] 
          : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        'style-src': process.env.NODE_ENV === 'production' 
          ? ["'self'"] 
          : ["'self'", "'unsafe-inline'"],
        'img-src': ["'self'", "data:"],
        'connect-src': ["'self'", process.env.NODE_ENV === 'production' ? '' : 'ws:'],
        'base-uri': ["'self'"],
        'form-action': ["'none'"],
        'object-src': ["'none'"]
      },
      // Use header for production, meta for development
      output: {
        // Use meta in dev, file in production
        type: 'meta'
      }
    })
  ]
})