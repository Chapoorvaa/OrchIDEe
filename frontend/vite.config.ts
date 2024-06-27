import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`
        entry: 'main.js',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`
        input: 'preload.mjs',
      },
      // Optional: Use Node.js API in the Renderer process
      renderer: {},
    }),
  ],
})