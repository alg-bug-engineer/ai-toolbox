import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 1. 從 'url' 模塊中引入 fileURLToPath 和 URL
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 2. 使用 new URL() 和 fileURLToPath() 來創建絕對路徑
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})