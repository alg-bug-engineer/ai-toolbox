import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button, Card, Col, message, Row, Spin, Typography, Upload, Image } from 'antd';
import { InboxOutlined, SendOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { mockGenerateSculptureAPI, mockFetchSculptureHistoryAPI } from '@/api/tools';
import { ImageHistoryItem } from '@/types';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const SculptureGeneratorPage: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    
    // 新增：历史画廊状态
    const [history, setHistory] = useState<ImageHistoryItem[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // 新增：无限滚动逻辑 (与 AI 梗图页完全一致)
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

    // 新增：获取历史数据的函数
    const fetchHistory = useCallback(async (pageNum: number) => {
        setIsLoadingHistory(true);
        try {
            const res = await mockFetchSculptureHistoryAPI(pageNum, 12);
            setHistory(prev => [...prev, ...res.list]);
            setHasMore(res.list.length > 0 && res.pagination.currentPage < res.pagination.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingHistory(false);
        }
    }, []);

    // 新增：初次加载和分页加载
    useEffect(() => {
        // 只有在 page 变化时才加载，避免重复请求
        if (page > 0) {
            fetchHistory(page);
        }
    }, [page, fetchHistory]);
    
    // 优化：提交逻辑
    const handleSubmit = async () => {
        if (fileList.length === 0) {
            message.warning('请先上传一张图片！');
            return;
        }
        setIsGenerating(true);
        try {
            const file = fileList[0].originFileObj as File;
            const newImageItem = await mockGenerateSculptureAPI(file);
            
            // 将新生成的图片添加到历史记录的开头
            setHistory(prev => [newImageItem, ...prev]);
            message.success('立体雕塑生成成功！');
            // 清空已上传文件列表
            setFileList([]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        listType: 'picture-card', // 优化：使用 picture-card 样式，更紧凑美观
        maxCount: 1,
        fileList: fileList,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('您只能上传 JPG/PNG 格式的图片!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小必须小于 2MB!');
            }
            if (isJpgOrPng && isLt2M) {
                 setFileList([file]);
            }
            return false;
        },
        onRemove: () => {
            setFileList([]);
        },
    };

    return (
        <div className="p-6">
            <Title level={2}>立体雕塑生成器</Title>
            <Text type="secondary" className="mb-6 block">
                上传一张图片，AI 将把它转换成立体雕塑风格的艺术品。
            </Text>

            {/* 优化：布局改为单栏，上传和提交按钮居中 */}
            <Card className="mb-8 max-w-xl mx-auto">
                <Dragger {...uploadProps} disabled={isGenerating}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽图片到此区域</p>
                    <p className="ant-upload-hint">支持 JPG/PNG, 不超过 2MB</p>
                </Dragger>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    loading={isGenerating}
                    disabled={fileList.length === 0}
                    icon={<SendOutlined />}
                    block
                    className="mt-4"
                >
                    {isGenerating ? '正在生成中...' : '开始生成'}
                </Button>
            </Card>
            
            {/* 新增：历史画廊部分 */}
            <Title level={3}>历史画廊</Title>
            <Image.PreviewGroup>
                <Row gutter={[16, 16]}>
                    {history.map((item, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={item.id} ref={history.length === index + 1 ? lastElementRef : null}>
                            <Card
                                hoverable
                                cover={<Image alt={item.originalFileName} src={item.imageUrl} className="h-48 object-cover" />}
                            >
                                <Card.Meta title={item.originalFileName || '未命名作品'} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Image.PreviewGroup>

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

export default SculptureGeneratorPage;