// API 响应的基础结构
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 用户信息
export interface UserInfo {
  id: string;
  email: string;
  avatar?: string;
}

// 图片历史记录项
export interface ImageHistoryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

// 分页数据结构
export interface PaginatedData<T> {
  list: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}