import { LockOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { mockRegisterAPI } from '../../api/auth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await mockRegisterAPI(values);
      // @ts-ignore
      if (res.code === 0) {
        message.success('注册成功！即将跳转到登录页。');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      console.error('注册失败:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="创建您的账户" style={{ width: 400 }}>
        <Form name="register" onFinish={onFinish}>
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱!' }]}>
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item name="invitationCode" rules={[{ required: true, message: '请输入邀请码!' }]}>
            <Input prefix={<KeyOutlined />} placeholder="邀请码 (ADMIN-123)" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              注册
            </Button>
          </Form.Item>
           <div className='text-center'>
            已有账户？ <Link to="/login">直接登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;