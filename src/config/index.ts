const isProd = import.meta.env.PROD;

// 根据环境变量区分 API 基地址
const API_BASE_URL = isProd
  ? 'https://api.your-ai-toolbox.com' // 生产环境 API
  : 'http://localhost:8080'; // 本地开发 API

export const config = {
    isProd,
    apiBaseUrl: API_BASE_URL,
};