import { apiEndpoints } from "@/config/api-config";
import apiClient from "@/config/axios-config";
import { ApiResponse, PaginationQuery, PaginationResponse } from "@/types/api";
import { RestaurantDetailType, RestaurantType } from "@/types/restaurant";

export const restaurantService = {
    getRestaurantDetail: async (id: string): Promise<ApiResponse<RestaurantDetailType>> => {

        return await apiClient.get<unknown, ApiResponse<RestaurantDetailType>>(
            apiEndpoints.restaurants.getDetail(id)
        );
    },
    getRestaurants: async ({ page = 1, limit = 10 }: PaginationQuery): Promise<PaginationResponse<RestaurantType>> => {

        return await apiClient.get<unknown, PaginationResponse<RestaurantType>>(apiEndpoints.restaurants.getList, {
            params: {
                page,
                limit
            }
        });
    },
}
