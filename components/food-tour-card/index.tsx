import { TourType } from '@/types/tour';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  tour: TourType;
}

export default function FoodTourCard({ tour }: Props) {
  const router = useRouter();
  const { t, i18n } = useTranslation(); 

  // Lấy ảnh đầu tiên trong mảng images, nếu không có thì dùng ảnh mặc định
  const coverImage = tour.images?.[0] || 'https://via.placeholder.com/150';

  // Tính số lượng địa điểm (places) dựa trên mảng restaurants từ API
  const placesCount = tour.restaurants?.length || 0;

  // Định dạng hiển thị giá tiền theo ngôn ngữ hiện tại
  const formatPrice = (value: number) => {
    const lang = i18n.language.split('-')[0];
    if (lang === 'vi') {
      return `${value.toLocaleString('vi-VN')}đ`;
    }
    // Chuyển đổi tạm thời sang USD cho các ngôn ngữ khác để demo (hoặc giữ nguyên VND)
    const usdPrice = Math.round(value / 25000); 
    return `$${usdPrice}.00`;
  };
console.log("Rendering FoodTourCard for tour:", tour.id); // Debug log
  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: "/tour/detail/[id]", params: { id: tour.id } })}
      className="bg-white rounded-3xl mb-5 shadow-md border border-slate-100 overflow-hidden w-[280px]"
      activeOpacity={0.9}
    >
      {/* Ảnh Tour */}
      <View className="relative">
        <Image 
          source={{ uri: coverImage }} 
          className="w-full h-48" 
          resizeMode="cover"
        />
        {/* Rating mặc định là 5.0 hoặc lấy từ dữ liệu nếu sau này API nâng cấp thêm trường */}
        <View className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="star" size={14} color="#fbbf24" />
          <Text className="ml-1 font-bold text-xs">5.0</Text>
        </View>
        <View className="absolute bottom-3 left-3 bg-red-600 px-3 py-1 rounded-lg">
          <Text className="text-white font-bold text-xs">{formatPrice(tour.price)}</Text>
        </View>
      </View>

      {/* Nội dung Tour */}
      <View className="p-4">
        <Text 
          className="text-lg font-bold text-slate-900 mb-2 line-clamp-1"
          numberOfLines={1}
        >
          {tour.name}
        </Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#64748b" />
            <Text className="ml-1 text-slate-500 text-sm">{tour.duration}</Text>
          </View>
          
          <View className="flex-row items-center">
            <Ionicons name="restaurant-outline" size={16} color="#64748b" />
            <Text className="ml-1 text-slate-500 text-sm">
              {placesCount} {t('components.foodTourCard.places')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}