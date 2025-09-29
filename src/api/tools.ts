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


// 新增：模拟立体雕塑历史数据
const allSculptureHistoryItems: ImageHistoryItem[] = Array.from({ length: 45 }, (_, i) => ({
  id: `sculpture-hist-${i + 1}`,
  imageUrl: `https://picsum.photos/seed/sculpture${i + 1}/400/400`,
  originalFileName: `我的作品_${i + 1}.jpg`,
  createdAt: new Date(Date.now() - i * 3600000).toISOString(), // 模拟不同时间创建
}));

// 新增：模拟获取立体雕塑历史记录 API
export const mockFetchSculptureHistoryAPI = (page = 1, pageSize = 12): Promise<PaginatedData<ImageHistoryItem>> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedList = allSculptureHistoryItems.slice(start, end);

      resolve({
        list: paginatedList,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalItems: allSculptureHistoryItems.length,
          totalPages: Math.ceil(allSculptureHistoryItems.length / pageSize),
        },
      });
    }, 1000); // 模拟网络延迟
  });
};


// 修改：原有的 mockGenerateSculptureAPI，使其也加入到历史记录中
export const mockGenerateSculptureAPI = (file: File): Promise<ImageHistoryItem> => {
  console.log("立体雕塑生成请求, 上传的文件:", file.name);
  return new Promise(resolve => {
    setTimeout(() => {
      const newItem: ImageHistoryItem = {
        id: `sculpture-gen-${Date.now()}`,
        imageUrl: `https://picsum.photos/seed/${file.name}/400/400`,
        originalFileName: file.name,
        createdAt: new Date().toISOString(),
      };
      // 将新生成的作品添加到总列表的开头
      allSculptureHistoryItems.unshift(newItem);
      resolve(newItem);
    }, 2500);
  });
};