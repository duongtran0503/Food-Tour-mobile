import { restaurantDemo } from "@/constants/data-demo";
import { restaurantService } from "@/servers/restaurant-service";
import { RestaurantDetailType } from "@/types/restaurant";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export const useRestaurantDetail = () => {
    const { id } = useLocalSearchParams();
    const { t } = useTranslation();

    const [restaurant, setRestaurant] = useState<RestaurantDetailType>(restaurantDemo);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDetail = useCallback(async () => {
        if (!id) return;

        try {
            setIsLoading(true);
            setError(null);
            const response = await restaurantService.getRestaurantDetail(id as string);

            setRestaurant(response.data);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            console.error("Fetch detail error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    return {
        id,
        t,
        restaurant,
        isLoading,
        error,
        refetch: fetchDetail
    };
};