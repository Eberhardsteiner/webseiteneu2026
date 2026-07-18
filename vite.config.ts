import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            // manualChunks nur im Client-Build — im SSR-Build (scripts/prerender.mjs)
            // sind react & Co. extern und dürfen nicht gechunkt werden.
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'lucide-vendor': ['lucide-react'],
            },
          },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
