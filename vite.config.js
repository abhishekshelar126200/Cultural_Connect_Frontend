import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev-time proxy to avoid CORS during local development.
  // Requests from the Vite dev server (http://localhost:5173) to paths
  // starting with `/compliance` or `/api` will be forwarded to the
  // backend at http://localhost:8081.
  server: {
    
    proxy: {
      '/compliance': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/compliance/, '/compliance') // optional
      },
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
