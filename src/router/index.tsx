import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

// 页面组件
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import WelcomePage from '../pages/Welcome';
import AIGeneratorPage from '../pages/Tools/AIGenerator';
// 1. 导入新页面组件
import SculptureGeneratorPage from '../pages/Tools/SculptureGenerator';
import MainLayout from '../components/layout/MainLayout';

// 路由守卫组件
const ProtectedRoute = () => {
  const { token } = useUserStore();
  // 如果没有 token，重定向到登录页
  return token ? <MainLayout /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/',
      element: <ProtectedRoute />, // 使用路由守卫
      children: [
        { index: true, element: <WelcomePage /> }, // 默认子路由
        {
          path: 'tools',
          element: <Outlet />, // 用于嵌套 'tools' 下的路由
          children: [
            { path: 'ai-meme', element: <AIGeneratorPage /> },
            // 未来可以添加其他工具页面
            // { path: '3d-sculpture', element: <ThreeDSculpturePage /> },
            // 2. 添加新功能的路由
            { path: '3d-sculpture', element: <SculptureGeneratorPage /> },
          ],
        },
      ],
    },
    // 其他所有未匹配的路由都重定向到首页
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
};

export default AppRouter;