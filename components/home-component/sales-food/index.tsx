import { SmallFoodCard } from "@/components/home-component";
import { useSalesFood } from "@/components/home-component/sales-food/useSalesFood";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SalesFood() {
  const { t, foods, isLoading } = useSalesFood();

  return (
    <View className="mb-4">
      <View className="px-4 mb-2 flex-row justify-between items-end">
        <Text className="text-xl font-extrabold text-slate-800">
          {t('screens.home.on_sale')}
        </Text>
        <TouchableOpacity>
          <Text className="text-primary font-bold text-sm">
            {t('screens.home.view_all')}
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="pl-4 mb-2 flex-row">
           {/* Skeleton đơn giản cho Small Card */}
           {[1, 2, 3].map((i) => (
             <View key={i} className="w-48 h-48 mr-5 bg-slate-50 rounded-3xl animate-pulse" />
           ))}
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="pl-2 mb-2"
          decelerationRate="fast"
        >
          {foods.map((food) => (
            <SmallFoodCard 
              key={food.id}
              name={food.name}
              image={food.images[0]}
              rate="4.9" // Mock hoặc lấy từ food.rating nếu có
              time="15-20 min"
              priceRange={food.priceRange}
              promo={true} // Giả định các món trong mục Sales đều là promo
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}