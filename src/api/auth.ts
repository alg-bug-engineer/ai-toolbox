// 1. 在文件顶部引入 Modal
import { Modal } from 'antd';

// 模拟 API，实际项目中将使用 service.post
export const mockLoginAPI = async (data: any) => {
    console.log("登录请求:", data);
    // 使用 Promise 构造函数时，应该接收 resolve 和 reject 两个参数
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email === "test@qq.com" && data.password === "123456") {
                resolve({
                    code: 0,
                    message: "登录成功",
                    data: {
                        token: "mock-jwt-token-string",
                        userInfo: {
                            id: "1",
                            email: "test@qq.com",
                        },
                    },
                });
            } else {
                // 模拟登录失败
                 Modal.error({ title: "登录失败", content: "邮箱或密码错误" });
                 // 2. 使用 reject 来处理 Promise 中的错误，这是更规范的做法
                 reject(new Error("邮箱或密码错误"));
            }
        }, 1000);
    });
};

export const mockRegisterAPI = async (data: any) => {
    console.log("注册请求:", data);
    // 因为这个检查是同步的，并且在 async 函数中，所以 throw new Error 会被自动捕获并返回一个 rejected 的 Promise，这种写法是可行的。
    if (data.invitationCode !== "ADMIN-123") {
         Modal.error({ title: "注册失败", content: "邀请码无效" });
         throw new Error("邀请码无效");
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: "注册成功",
                data: null
            });
        }, 1000);
    });
};