import { Typography } from 'antd';
import { useUserStore } from '../../store/userStore';

const { Title, Paragraph } = Typography;

const WelcomePage: React.FC = () => {
    const { userInfo } = useUserStore();

    return (
        <div className="p-8 text-center">
            <Title>欢迎, {userInfo?.email || '用户'}!</Title>
            <Paragraph>
                欢迎使用 AI 工具箱。请从左侧菜单中选择一个功能开始您的创作之旅。
            </Paragraph>
        </div>
    );
};

export default WelcomePage;