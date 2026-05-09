import { PriceRangeType } from '@/types/common';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { Image, Text, TouchableOpacity, View } from 'react-native';
interface SmallFoodCardProps {
  id:string
  name: string;
  rate: string | number;
  time: string;
  priceRange: { min: number; max: number };
  image?: string;
  promo?: boolean;
}

export function SmallFoodCard({ id,name, rate, time, priceRange, image, promo }: SmallFoodCardProps) {
  const { t } = useTranslation();
  const router = useRouter();

  // Helper format giá (lấy mức giá tối thiểu để hiển thị cho gọn ở thẻ nhỏ)
  const displayPrice = `${Math.floor(priceRange.min / 1000)}k`;

  return (
    <TouchableOpacity 
    onPress={()=>router.push({ pathname: "/food/detail/[id]", params: { id: id } })}
    className="w-48 mr-5 bg-white border border-slate-200 rounded-[30px] p-2 shadow-xl shadow-slate-400">
      {/* Container Ảnh */}
      <View className="w-full h-32 bg-slate-50 rounded-[22px] overflow-hidden justify-center items-center relative">
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <Ionicons name="fast-food" size={40} color="#cbd5e1" />
        )}

        {promo && (
          <View className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-lg z-10 shadow-sm">
            <Text className="text-white text-[8px] font-black uppercase">
              {t('components.foodCards.hot_deal')}
            </Text>
          </View>
        )}

        <View className="absolute bottom-2 right-2 bg-white/95 px-2 py-0.5 rounded-full flex-row items-center shadow-sm">
          <Ionicons name="star" size={10} color="#f59e0b" />
          <Text className="text-[10px] font-black ml-1 text-slate-800">{rate}</Text>
        </View>
      </View>

      {/* Nội dung Text */}
      <View className="px-1.5 py-3">
        <Text className="font-black text-slate-800 text-[13px]" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-[10px] text-slate-400 mt-1" numberOfLines={1}>
          {time} • {t('components.foodCards.shipping_fee')}: <Text className="text-primary text-[12px] font-bold">{displayPrice}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
// 1. Component Skeleton
export function BigFoodCardSkeleton() {
  return (
    <View className="w-[48%] mb-6 opacity-50">
      <View className="h-44 bg-slate-200 rounded-[30px]" />
      <View className="h-4 bg-slate-200 w-3/4 mt-3 rounded-lg" />
      <View className="h-3 bg-slate-100 w-1/2 mt-2 rounded-lg" />
    </View>
  );
}
interface BigFoodCardProps {
  id:string;
  name: string;
  rate: string | number;
  time: string;
  priceRange:PriceRangeType;
  tag: string;
  discount?: string;
  image?: string;
  description?: string;
}

export function BigFoodCard({ id, name, rate, time, priceRange, tag, discount, image ,description}: BigFoodCardProps) {
  
  // Hàm format giá: Nếu min = max thì hiện 1 giá, nếu khác thì hiện khoảng giá
  const router = useRouter()
  const formatPrice = () => {
    const { min, max } = priceRange;
    if (!min && !max) return "Free";
    
    const formatK = (val: number) => `${Math.floor(val / 1000)}k`;
    
    if (min === max) return formatK(min);
    return `${formatK(min)} - ${formatK(max)}`;
  };

  return (
    <TouchableOpacity 
    onPress={()=>router.push({ pathname: "/food/detail/[id]", params: { id: id } })}
    className="w-[48%] mb-2 bg-white border border-slate-100 rounded-[35px] p-2 shadow-xl shadow-slate-400"
    
    >
      {/* Container Ảnh */}
      <View className="h-40 rounded-[28px] overflow-hidden bg-slate-50 relative">
        {image ? (
          <Image 
            source={{ uri: image }} 
            className="w-full h-full" 
            resizeMode="cover" 
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="fast-food-outline" size={40} color="#cbd5e1" />
          </View>
        )}
        
        {/* Badge Giảm giá */}
        {discount && (
          <View className="absolute top-2 left-2 bg-red-600 px-2.5 py-1 rounded-full shadow-sm">
            <Text className="text-white text-[9px] font-black uppercase tracking-tighter">
              {discount} OFF
            </Text>
          </View>
        )}

        {/* Badge Rating */}
        <View className="absolute bottom-2 right-2 bg-white/95 px-2 py-1 rounded-full flex-row items-center shadow-md">
          <Ionicons name="star" size={10} color="#f59e0b" />
          <Text className="text-[10px] font-bold ml-1 text-slate-800">{rate}</Text>
        </View>
      </View>

      {/* Thông tin Text */}
      <View className="px-2 pb-2">
        <Text className="font-black text-slate-800 mt-3 text-[15px] leading-5" numberOfLines={1}>
          {name}
        </Text>
        
        <View className="flex-row items-center mt-1.5 flex-wrap">
          
          <Ionicons name="time-outline" size={12} color="#94a3b8" />
          <Text className="text-[10px] text-slate-400 font-medium ml-1">
            {time} • 
          </Text>
          <Text className="text-[12px]  text-primary font-bold ml-1">
            {formatPrice()}
          </Text>
        </View>
        {description && (
          <Text className="text-[10px] text-slate-500 mt-2" numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}