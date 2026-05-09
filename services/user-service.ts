import { apiEndpoints } from "@/config/api-config";
import apiClient from "@/config/axios-config";
import { authService } from "@/services/auth-service";
import { ApiResponse } from "@/types/api";
import { ProfileFormData, UserProfileType } from "@/types/user";

export const userService = {
    getProfile: async () => {
        const token = await authService.getAccessToken();
        const response = await apiClient.get<unknown, ApiResponse<UserProfileType>>(apiEndpoints.user.getProfile,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("API response in getProfile:", response.data); // Debug log  

        return response.data;
    },

    updateProfile: async ({ id, data }: { id: string; data: Partial<ProfileFormData> }) => {
        console.log("Updating profile with data:", { id, data }); // Debug log
        const token = await authService.getAccessToken();
        const response = await apiClient.patch<ApiResponse<UserProfileType>>(apiEndpoints.user.updateProfile, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    },
};