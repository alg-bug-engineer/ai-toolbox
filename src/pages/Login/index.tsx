import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { mockLoginAPI } from '../../api/auth';

// 定义登录响应类型
interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
    userInfo: {
      id: string;
      email: string;
      // 可根据实际 userInfo 结构补充字段
    };
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useUserStore();

  const onFinish = async (values: any) => {
    try {
      const res = await mockLoginAPI(values) as LoginResponse;
      if (res.code === 0) {
        setToken(res.data.token);
        setUser(res.data.userInfo);
        message.success('登录成功！');
        navigate('/');
      }
    } catch (error) {
      console.error('登录失败:', error);
      // 错误弹窗已在 API 层或拦截器中处理
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="欢迎回来" style={{ width: 400 }}>
        <Form name="login" onFinish={onFinish} >
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱地址!' }]}>
            <Input prefix={<UserOutlined />} placeholder="邮箱 (test@qq.com)" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码 (123456)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
          <div className='text-center'>
            还没有账户？ <Link to="/register">立即注册</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;