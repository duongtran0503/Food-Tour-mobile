import FoodTourCard from '@/components/food-tour-card';
import apiClient from '@/config/axios-config';
import { TourType } from '@/types/tour';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function HomeToursSection() {
  const { t, i18n } = useTranslation();

  const { data: response, isLoading } = useQuery({
    queryKey: ['tours', i18n.language],
    queryFn: async () => {
      const res = await apiClient.get(`/tours`);
      return res.data;
    }
  });

  // 1. CHỈNH SỬA TẠI ĐÂY: Dùng Optional Chaining và kiểm tra đúng cấu trúc trả về
  // Thường là response.data.items hoặc response.items tùy vào backend
  const tours = response?.data?.items || response?.items || [];

  // 2. PHẢI KIỂM TRA isLoading TRƯỚC KHI RENDER LIST
  if (isLoading) {
    return (
      <View className="py-10 items-center justify-center">
        <ActivityIndicator size="small" color="#ef4444" />
      </View>
    );
  }

  return (
    <View className="mb-4">
      <View className="flex-row items-center py-2 px-4">
        <Ionicons name="flame" size={24} color="#ef4444" /> 
        <Text className="ml-2 font-bold text-lg">{t('screens.home.tour_list')}</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
      >
        {tours.length > 0 ? (
          tours.map((tour: TourType) => (
            <View key={tour.id} className="mr-4">
              <FoodTourCard tour={tour} />
            </View>
          ))
        ) : (
          <Text className="text-slate-400 italic py-4">
            {t('common.no_data')}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}