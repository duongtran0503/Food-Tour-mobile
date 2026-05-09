import { apiEndpoints } from "@/config/api-config";
import apiClient from "@/config/axios-config";
import { ApiResponse } from "@/types/api";
import { AuthResponse } from "@/types/auth";
import * as SecureStore from 'expo-secure-store';
export const authService = {
    async login(paylaod: { email: string, password: string }): Promise<ApiResponse<AuthResponse>> {
        return await apiClient.post<unknown, ApiResponse<AuthResponse>>(apiEndpoints.auth.login, paylaod)
    }
    ,
    async getAccessToken() {
        const token = await SecureStore.getItemAsync('userToken');
        return token;
    }
}