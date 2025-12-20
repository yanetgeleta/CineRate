import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // String shorthand:
      // "Whenever the frontend sees '/api', forward it to localhost:3000"
      '/api': 'http://localhost:3000', 
      
      // OR, the detailed object syntax (Recommended):
      '/api': {
        target: 'http://localhost:3000', // Your Node Backend Port
        changeOrigin: true,
        secure: false,      
      }
    }
  }
})