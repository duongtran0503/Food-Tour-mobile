import { apiEndpoints } from "@/config/api-config";
import apiClient from "@/config/axios-config";
import { PaginationQuery, PaginationResponse } from "@/types/api";
import { FoodType } from "@/types/food";

export const foodService = {
    async getList({ page = 1, limit = 10 }: PaginationQuery) {
        return await apiClient.get<unknown, PaginationResponse<FoodType>>(apiEndpoints.foods.getLIst, {
            params: {
                page: page,
                limit: limit
            }
        })
    }
}