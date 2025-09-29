import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { RobotOutlined, CrownOutlined } from '@ant-design/icons'; // 示例图标

const { Sider } = Layout;

const menuItems = [
  {
    key: '/tools/ai-meme',
    icon: <RobotOutlined />,
    label: 'AI 梗图',
  },
  {
    key: '/tools/3d-sculpture',
    icon: <CrownOutlined />,
    label: '立体雕塑',
  },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };
  
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="h-8 m-4 bg-gray-700 text-white flex items-center justify-center rounded">
        {collapsed ? 'AI' : 'AI 工具箱'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;