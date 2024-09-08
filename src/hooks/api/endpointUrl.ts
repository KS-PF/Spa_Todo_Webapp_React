import axios from "axios";

const EndpointUrl:string = import.meta.env.VITE_API_URL

// axios instanceの作成
export const apiClient = axios.create({
    baseURL: EndpointUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 6000,
});

// 認証ヘッダーを付加する関数
export const authHeader = (token: string) => ({
    headers: { Authorization: `Token ${token}` },
});
