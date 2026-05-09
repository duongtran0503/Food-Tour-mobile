import { BigFoodCard, BigFoodCardSkeleton } from "@/components/home-component";
import { ActivityIndicator, Text, View } from "react-native";
import { useFoodForYou } from "./useFoodForYou";

export default function FoodForYou() {
  const { t, foods, isLoading, isFetchingNextPage } = useFoodForYou();

  return (
    <>
      <View className="px-4 mb-2">
        <Text className="text-xl font-extrabold text-slate-800">
          {t('screens.home.for_you')}
        </Text>
      </View>

      <View className="px-4 gap-y-2 flex-row justify-between flex-wrap">
        {/* Hiện Skeleton khi tải lần đầu */}
        {isLoading && [1, 2, 3, 4].map((i) => <BigFoodCardSkeleton key={i} />)}

        {/* Render dữ liệu thực */}
        {!isLoading && foods.map((food) => (
          <BigFoodCard
            id={food.id}
            key={food.id}
            name={food.name}
            image={food.images[0]}
            rate="4.8" // Hoặc lấy từ API nếu có
            time="20 min"
            priceRange={food.priceRange} // Format giá
            tag={"new"}
            description={food.description} // Mô tả thêm
          />
        ))}

        {/* Loading khi đang tải trang tiếp theo */}
        {isFetchingNextPage && (
          <View className="w-full py-4 items-center">
            <ActivityIndicator color="#930004" />
          </View>
        )}
      </View>
    </>
  );
}