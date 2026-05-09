import { getVinkTours } from '@/constants/data-demo';
import { restaurantService } from '@/services/restaurant-service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useHome = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();

    const {
        data: restaurantData,
        isLoading,
        isRefetching,
        refetch: fetchRestaurants
    } = useQuery({
        queryKey: ['restaurants', i18n.language], // Key sẽ thay đổi khi ngôn ngữ đổi để fetch lại nếu cần
        queryFn: () => restaurantService.getRestaurants({ page: 1, limit: 10 }),
        // Trích xuất dữ liệu items ngay tại đây để bên ngoài dễ dùng
        select: (response) => response.data.items,
    });

    const vinkTours = useMemo(() => getVinkTours(i18n.language), [i18n.language]);

    const categoryData = useMemo(() => [
        { name: t('screens.home.cat_names.burgers'), img: '🍔' },
        { name: t('screens.home.cat_names.vegan'), img: '🥗' },
        { name: t('screens.home.cat_names.deals'), img: '🏷️', promo: true },
        { name: t('screens.home.cat_names.ice_cream'), img: '🍦' },
        { name: t('screens.home.cat_names.pizza'), img: '🍕' },
        { name: t('screens.home.cat_names.burgers'), img: '🍔' },
        { name: t('screens.home.cat_names.vegan'), img: '🥗' },
        { name: t('screens.home.cat_names.deals'), img: '🏷️', promo: true },
        { name: t('screens.home.cat_names.ice_cream'), img: '🍦' },
        { name: t('screens.home.cat_names.pizza'), img: '🍕' },
    ], [t]);

    return {
        t,
        i18n,
        router,
        restaurants: restaurantData || [], // Nếu chưa có data thì trả về mảng rỗng
        vinkTours,
        categoryData,
        isLoading,
        isRefreshing: isRefetching, // Trạng thái khi người dùng kéo để load lại
        fetchRestaurants // Hàm này dùng cho Pull-to-refresh
    };
};