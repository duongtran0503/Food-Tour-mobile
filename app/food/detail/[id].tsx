import ButtonBack from '@/components/button-back';
import apiClient from '@/config/axios-config';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  // 1. Fetch dữ liệu từ API dựa trên ID
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['foodDetail', id, i18n.language],
    queryFn: async () => {
      // Chuyển đổi ngôn ngữ vn/en tương ứng với i18next
      // Gọi đúng endpoint lấy chi tiết món ăn
      const res = await apiClient.get(`/foods/${id}`); 
      return res.data;
    },
    enabled: !!id,
  });

  // Truy cập trực tiếp vào response.data theo cấu trúc mới nhất
  const food = response;
  console.log("Fetched food data:", food); // Debug log để kiểm tra dữ liệu nhận được

  const handleAdjustQuantity = (type: 'plus' | 'minus') => {
    if (type === 'plus') setQuantity(q => q + 1);
    else if (quantity > 1) setQuantity(q => q - 1);
  };

  // Trạng thái Loading
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#930004" />
      </View>
    );
  }

  // Trạng thái Lỗi hoặc không tìm thấy data
  if (isError || !food) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-slate-500 mb-4">{t('common.error_loading')}</Text>
        <ButtonBack />
      </View>
    );
  }

  // Hàm format tiền tệ (25000 -> 25.000đ)
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <SafeAreaView className="absolute top-0 left-0 right-0 z-50 px-5 flex-row justify-between">
        <ButtonBack />
        <TouchableOpacity className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ảnh món ăn - API trả về mảng images */}
        <View className="relative">
          <Image 
            source={{ uri: food.images?.[0] || 'https://via.placeholder.com/400' }} 
            className="w-full h-96" 
            resizeMode="cover" 
          />
        </View>

        <View className="bg-white -mt-8 rounded-t-[40px] px-6 pt-8 pb-32">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-black text-slate-900">{food.name}</Text>
              <View className="flex-row items-center mt-2">
                <Ionicons name="star" size={18} color="#fbbf24" />
                <Text className="ml-1 font-bold text-slate-900">4.9</Text>
                <Text className="ml-2 text-slate-400 font-medium">
                  {t('screens.food_detail.purchases', { count: 850 })}
                </Text>
              </View>
            </View>
            
            {/* Giá tiền từ priceRange */}
            <View className="items-end">
              <Text className="text-2xl font-black text-[#930004]">
                {formatPrice(food.priceRange?.min || 0)}
              </Text>
              {food.priceRange?.max > food.priceRange?.min && (
                <Text className="text-xs text-slate-400">
                  đến {formatPrice(food.priceRange.max)}
                </Text>
              )}
            </View>
          </View>

          {/* Selector số lượng */}
          <View className="flex-row items-center mt-8 bg-slate-50 p-4 rounded-3xl justify-between">
            <Text className="font-bold text-slate-700 text-lg">
              {t('screens.food_detail.quantity')}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity 
                onPress={() => handleAdjustQuantity('minus')}
                className="w-10 h-10 border border-slate-200 rounded-xl items-center justify-center bg-white"
              >
                <Ionicons name="remove" size={20} color="black" />
              </TouchableOpacity>
              <Text className="mx-6 font-black text-xl">{quantity}</Text>
              <TouchableOpacity 
                onPress={() => handleAdjustQuantity('plus')}
                className="w-10 h-10 bg-[#930004] rounded-xl items-center justify-center"
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Mô tả chi tiết */}
          <View className="mt-8">
            <Text className="text-xl font-black text-slate-900 mb-3">
              {t('screens.food_detail.description_title')}
            </Text>
            <Text className="text-slate-500 leading-6 text-base italic">
              {food.description || t('screens.food_detail.no_description')}
            </Text>
          </View>

          {/* Trạng thái món ăn */}
          {food.status === 'AVAILABLE' && (
            <View className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100 flex-row items-center">
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              <Text className="ml-3 text-green-800 font-medium flex-1">
                {t('screens.food_detail.available_now')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white/95 border-t border-slate-100">
        <TouchableOpacity 
          className="bg-[#930004] h-16 rounded-2xl flex-row items-center justify-center shadow-lg shadow-red-900/30"
          onPress={() => Alert.alert(t('screens.food_detail.developing_feature'))}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text className="text-white font-black text-lg ml-3">
            {t('screens.food_detail.add_to_cart')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}