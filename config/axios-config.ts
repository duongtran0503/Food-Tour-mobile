import axios from 'axios';

// LƯU Ý CHO DƯƠNG: 
// Nếu chạy trên máy ảo Android: dùng http://10.0.2.2:8080
// Nếu chạy trên máy thật: dùng IP của máy tính (VD: http://192.168.1.5:8080)
const baseURL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 15000, // Đợi tối đa 15 giây
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response.data, // Trả về data luôn, không cần .data ở phía ngoài component
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;