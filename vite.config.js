import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages repository subpath support
const base = process.env.NODE_ENV === 'production' ? '/Portfolio_Swetha_S/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
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
