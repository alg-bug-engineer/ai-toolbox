/** @type {import('tailwindcss').Config} */
export default {
  // 核心改为 'jit' 模式以获得最佳性能和所有功能
  mode: 'jit', 
  // 扫描 src 目录下所有 ts, tsx 文件
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 核心配置，防止 antd 样式与 tailwind 样式冲突
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}