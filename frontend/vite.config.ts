import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      buffer: 'buffer',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  esbuild: {
    target: 'es2020',
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  server: {
    fs: {
      allow: ['./src', './public', './', '../target/idl']
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
