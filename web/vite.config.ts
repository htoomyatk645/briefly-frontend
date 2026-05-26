import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    open: false,
    allowedHosts: true,
    hmr: {
      clientPort: 5173,
    },
  },
})
