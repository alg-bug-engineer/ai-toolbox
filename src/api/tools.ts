import { ImageHistoryItem, PaginatedData } from "../types";

// 模拟历史数据
const allHistoryItems: ImageHistoryItem[] = Array.from({ length: 50 }, (_, i) => ({
  id: `hist-id-${i + 1}`,
  prompt: `生成的第 ${i + 1} 张图片`,
  imageUrl: `https://picsum.photos/seed/${i + 1}/400/300`,
  createdAt: new Date().toISOString(),
}));

// 模拟获取历史记录 API (支持分页)
export const mockFetchHistoryAPI = (page = 1, pageSize = 10): Promise<PaginatedData<ImageHistoryItem>> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedList = allHistoryItems.slice(start, end);

      resolve({
        list: paginatedList,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: allHistoryItems.length,
          totalPages: Math.ceil(allHistoryItems.length / pageSize),
        },
      });
    }, 1000); // 模拟网络延迟
  });
};

// 模拟生成图片 API
export const mockGenerateImageAPI = (prompt: string): Promise<{ id: string, imageUrl: string, prompt: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newItem = {
        id: `gen-${Date.now()}`,
        imageUrl: `https://picsum.photos/seed/${prompt}/400/300`,
        prompt: prompt,
      };
      // 模拟添加到总列表的开头
      allHistoryItems.unshift({ ...newItem, createdAt: new Date().toISOString() });
      resolve(newItem);
    }, 2000);
  });
};