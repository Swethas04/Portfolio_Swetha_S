import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using relative base './' allows the app to work seamlessly everywhere:
// - localhost:4173 (preview)
// - localhost:5173 / localhost:5174 (dev)
// - GitHub Pages (https://swethas04.github.io/Portfolio_Swetha_S/)
// - Vercel / Netlify
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
