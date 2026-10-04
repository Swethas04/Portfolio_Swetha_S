import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set VITE_BASE_PATH env var when building for GitHub Pages:
//   VITE_BASE_PATH=/portfolio/ npm run build
// For Netlify / Vercel (served from root), leave unset → defaults to './'
const base = process.env.VITE_BASE_PATH || './'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,        // disable source maps in production
    rollupOptions: {
      output: {
        // Split vendor chunk for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
