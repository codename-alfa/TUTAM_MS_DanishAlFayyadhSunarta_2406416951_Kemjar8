import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'cs8.netlabdte.com',
      'cs7.netlabdte.com',
      'localhost'
    ],
    host: '0.0.0.0', 
  }
})
