import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), splitVendorChunkPlugin()],
  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // rollup 配置
    rollupOptions: {},
  },
  server: {
    port: 3000, // 端口号
  },
})
