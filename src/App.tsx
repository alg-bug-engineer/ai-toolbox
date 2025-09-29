import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import AppRouter from './router';

function App() {
  return (
    // 配置 antd 的中文语言包
    <ConfigProvider locale={zhCN}>
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;