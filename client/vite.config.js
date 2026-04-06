import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      '/node_modules/vite-plugin-vue-inspector/src/Overlay.vue': '/Users/ricardo/Documents/Deploy/novacasa/client/node_modules/vite-plugin-vue-inspector/src/Overlay.vue',
    },
  },
})
