import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Vite configuration specifically for building the npm library package
export default defineConfig({
  plugins: [react()],
  define: {
    // Explicitly prevent baking local environment secrets into the distributed bundle
    'import.meta.env.VITE_FIREBASE_API_KEY': 'undefined',
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': 'undefined',
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': 'undefined',
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': 'undefined',
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': 'undefined',
    'import.meta.env.VITE_FIREBASE_APP_ID': 'undefined'
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'RajAuthKit',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'raj-authkit.js' : 'raj-authkit.cjs')
    },
    rollupOptions: {
      // Do not bundle peer dependencies
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'firebase',
        'firebase/app',
        'firebase/auth'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'firebase/app': 'firebaseApp',
          'firebase/auth': 'firebaseAuth'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name
        }
      }
    },
    sourcemap: true
  }
})
