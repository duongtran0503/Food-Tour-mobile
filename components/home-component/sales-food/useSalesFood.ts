import { foodService } from "@/servers/food-service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useSalesFood = () => {
    const { t, i18n } = useTranslation();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: ['foods-for-you', i18n.language],
        queryFn: ({ pageParam }) => foodService.getList({
            page: pageParam as number,
            limit: 6
        }),
        // 1. Bắt buộc phải có initialPageParam
        initialPageParam: 1,

        // 2. Định nghĩa hàm lấy trang tiếp theo
        getNextPageParam: (lastPage) => {
            const meta = lastPage.data.meta;
            const hasNext = meta.currentPage < meta.totalPages;
            return hasNext ? meta.currentPage + 1 : undefined;
        },

        // 3. Phải thêm hàm này để tránh lỗi Call Stack liên quan đến Previous Page
        getPreviousPageParam: (firstPage) => {
            const meta = firstPage.data.meta;
            return meta.currentPage > 1 ? meta.currentPage - 1 : undefined;
        },
    });

    // Gộp dữ liệu từ các trang (pages) thành 1 mảng phẳng
    const allFoods = data?.pages.flatMap(page => page.data.items) || [];

    return {
        t,
        foods: allFoods,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        loadMore: () => {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    };
};