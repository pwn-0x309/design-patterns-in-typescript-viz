import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries - stable, rarely changes
          'vendor-react': ['react', 'react-dom'],
          // Router library
          'vendor-router': ['react-router-dom'],
          // UI/Animation libraries
          'vendor-ui': ['framer-motion', 'lucide-react'],
          // Syntax highlighter - large library
          'vendor-syntax': [
            'react-syntax-highlighter',
            'react-syntax-highlighter/dist/esm/styles/prism'
          ],
        },
      },
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 500, // Warn if chunk > 500KB
    // Enable source maps for easier debugging (optional, increases build size)
    sourcemap: false,
  },
})
