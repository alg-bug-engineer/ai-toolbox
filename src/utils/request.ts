import axios, { AxiosError } from 'axios';
import { Modal } from 'antd';
import { config } from '../config';
import { useUserStore } from '../store/userStore';
import { ApiResponse } from '../types';

const service = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 30000, // 请求超时时间，文生图可能较长
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取 zustand 中的 token
    const token = useUserStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 后端约定的成功码为 0
    if (response.data.code === 0) {
      return response.data;
    }
    // 其他 code 视为业务错误，弹出提示
    Modal.error({
        title: '操作失败',
        content: response.data.message || '未知错误',
    });
    return Promise.reject(new Error(response.data.message || 'Error'));
  },
  (error: AxiosError<ApiResponse>) => {
    let errorMessage = '网络似乎出了点问题，请稍后再试';
    if (error.response && error.response.data && error.response.data.message) {
        // 如果后端返回了明确的错误信息
        errorMessage = error.response.data.message;
    } else if (error.message) {
        errorMessage = error.message;
    }
    
    // 使用 Ant Design 的 Modal 组件弹出错误
    Modal.error({
      title: `请求错误 (状态码: ${error.response?.status || 'N/A'})`,
      content: errorMessage,
    });
    
    return Promise.reject(error);
  }
);

export default service;