# AI Toolbox 项目说明

## 项目简介

AI Toolbox 是一个基于 React + Vite + TypeScript 的前端项目，集成了多种 AI 工具和实用功能，界面美观，体验流畅，适合 AI 工具箱类产品的二次开发和学习。

## 主要特性
- 使用 React 18 + Vite 构建，开发体验极佳
- TypeScript 全面类型约束，代码更健壮
- Ant Design 组件库，UI 现代美观
- 支持环境变量区分开发/生产 API
- 支持用户登录、注册、Token 持久化
- AI 生成图片、历史画廊、无限滚动等功能
- 代码结构清晰，易于扩展

## 目录结构
```
├── public/                # 静态资源
├── src/                   # 源码目录
│   ├── api/               # API 请求封装
│   ├── assets/            # 静态图片等资源
│   ├── components/        # 通用组件
│   ├── pages/             # 页面组件
│   ├── store/             # 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── App.tsx            # 应用入口
│   └── main.tsx           # 入口文件
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明文档
```

## 快速开始
1. 安装依赖
  ```sh
  npm install
  ```
2. 启动开发环境
  ```sh
  npm run dev
  ```
3. 打包生产环境
  ```sh
  npm run build
  ```

## 常见问题
- 如遇到依赖或类型报错，请先删除 node_modules 并重新安装依赖。
- 环境变量请参考 .env 文件配置。

## 贡献与反馈
欢迎提交 issue 或 PR 参与项目共建！

---

如需更多帮助，请联系项目维护者。
# React + TypeScript + Vite
