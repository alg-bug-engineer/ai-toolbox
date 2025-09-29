import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Button, Spin, Card, Row, Col, Typography, message, Image } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { mockGenerateImageAPI, mockFetchHistoryAPI } from '../../../api/tools';
import { ImageHistoryItem } from '@/types';

const { Title, Text } = Typography;
const { TextArea } = Input;

const AIGeneratorPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    
    // 历史画廊状态
    const [history, setHistory] = useState<ImageHistoryItem[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Intersection Observer 用于无限滚动
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (isLoadingHistory) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoadingHistory, hasMore]);


    // 获取历史数据的函数
    const fetchHistory = useCallback(async (pageNum: number) => {
        setIsLoadingHistory(true);
        try {
            const res = await mockFetchHistoryAPI(pageNum, 12); // 每页加载12个
            setHistory(prev => [...prev, ...res.list]);
            setHasMore(res.list.length > 0 && res.pagination.currentPage < res.pagination.totalPages);
        } catch (error) {
            // 错误弹窗已在 axios 拦截器中处理
        } finally {
            setIsLoadingHistory(false);
        }
    }, []);

    // 初次加载和分页加载
    useEffect(() => {
        fetchHistory(page);
    }, [page, fetchHistory]);

    // 提交生成请求
    const handleSubmit = async () => {
        if (!prompt.trim()) {
            message.warning('请输入有效的热词或描述！');
            return;
        }
        setIsGenerating(true);
        try {
            const result = await mockGenerateImageAPI(prompt);
            const newImageItem: ImageHistoryItem = {
              ...result,
              imageUrl: result.imageUrl, // 确保字段匹配
              createdAt: new Date().toISOString()
            }
            // 将新生成的图片添加到历史记录的开头
            setHistory(prev => [newImageItem, ...prev]);
            message.success('图片生成成功！');
        } catch (error) {
            // 错误弹窗已在 axios 拦截器中处理
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="p-6">
            <Title level={2}>AI 梗图</Title>
            <Text type="secondary" className="mb-4 block">输入一个热词或一段描述，让 AI 为你创作有趣的梗图。</Text>

            <div className="flex items-start space-x-4 mb-8">
                <TextArea
                    rows={4}
                    placeholder="例如：打工人、遥遥领先、i人e人..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-grow"
                    disabled={isGenerating}
                />
                <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    loading={isGenerating}
                    icon={<PictureOutlined />}
                >
                    立即生成
                </Button>
            </div>
            
            <Title level={3}>历史画廊</Title>
            
            {/* 使用 Ant Design 的 Image.PreviewGroup 来实现点击放大功能 */}
            <Image.PreviewGroup>
                <Row gutter={[16, 16]}>
                    {history.map((item, index) => (
                         // 如果是最后一个元素，则附加 ref 用于无限滚动检测
                        <Col xs={24} sm={12} md={8} lg={6} key={item.id} ref={history.length === index + 1 ? lastElementRef : null}>
                            <Card
                                hoverable
                                cover={<Image alt={item.prompt} src={item.imageUrl} className="h-48 object-cover" />}
                            >
                                <Card.Meta title={item.prompt} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Image.PreviewGroup>

            {/* 加载指示器 */}
            {isLoadingHistory && (
                <div className="text-center p-8">
                    <Spin size="large" />
                </div>
            )}

            {!hasMore && history.length > 0 && (
                <div className="text-center p-8 text-gray-500">
                    已经到底啦~
                </div>
            )}
        </div>
    );
};

export default AIGeneratorPage;