import i18n from '@/lib/i18n';
import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const currentLanguage = i18n.language || 'vi';

        config.headers['Accept-Language'] = currentLanguage;
        config.headers['lang'] = currentLanguage;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;