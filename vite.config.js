import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 8 (Rolldown) — split the heavy vendors into their own chunks so they
// don't block the initial app bundle. The 3D library lands in an async chunk
// because it is only imported from the lazy HeroPlanetCanvas component.
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'model-viewer',
              test: /node_modules[\\/](@google[\\/]model-viewer|@lit|lit|lit-html|lit-element)/,
            },
            {
              name: 'framer-motion',
              test: /node_modules[\\/](framer-motion|motion|motion-dom|motion-utils)/,
            },
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|react-router-hash-link)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
