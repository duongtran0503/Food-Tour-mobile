import ButtonBack from '@/components/button-back';
import { MenuItemType } from '@/types/restaurant';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const food: MenuItemType = {
    id: '1',
    name: 'Ốc hương trứng muối',
    price: '150.000đ',
    image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg',
    rating: '5.0',
    desc: 'Món ăn đặc sản với vị béo ngậy của trứng muối bao phủ quanh những con ốc hương tươi rói, giòn sần sật. Đây là món "best-seller" không thể bỏ qua khi ghé thăm quán.'
  };

  const handleAdjustQuantity = (type: 'plus' | 'minus') => {
    if (type === 'plus') setQuantity(q => q + 1);
    else if (quantity > 1) setQuantity(q => q - 1);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Header Buttons */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-50 px-5 flex-row justify-between">
        <ButtonBack />
        <TouchableOpacity className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hình ảnh món ăn lớn */}
        <View className="relative">
          <Image 
            source={{ uri: food.image }} 
            className="w-full h-96" 
            resizeMode="cover" 
          />
          <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        </View>

        {/* Nội dung chi tiết */}
        <View className="bg-white -mt-8 rounded-t-[40px] px-6 pt-8 pb-32">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-black text-slate-900">{food.name}</Text>
              <View className="flex-row items-center mt-2">
                <Ionicons name="star" size={18} color="#fbbf24" />
                <Text className="ml-1 font-bold text-slate-900">{food.rating}</Text>
                <Text className="ml-1 text-slate-400 font-medium">(500+ lượt mua)</Text>
              </View>
            </View>
            <Text className="text-2xl font-black text-[#930004]">{food.price}</Text>
          </View>

          {/* Chọn số lượng */}
          <View className="flex-row items-center mt-8 bg-slate-50 p-4 rounded-3xl justify-between">
            <Text className="font-bold text-slate-700 text-lg">Số lượng</Text>
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

          {/* Mô tả món ăn */}
          <View className="mt-8">
            <Text className="text-xl font-black text-slate-900 mb-3">Mô tả món ăn</Text>
            <Text className="text-slate-500 leading-6 text-base italic">
              {food.desc}
            </Text>
          </View>

          {/* Gợi ý thêm */}
          <View className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex-row items-center">
            <Ionicons name="flame" size={24} color="#f59e0b" />
            <Text className="ml-3 text-yellow-800 font-medium flex-1">
              Món này đang được giảm giá 10% khi đặt qua app hôm nay!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút thanh toán cố định ở dưới */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
        <TouchableOpacity 
          className="bg-[#930004] h-16 rounded-2xl flex-row items-center justify-center shadow-lg shadow-red-900"
          onPress={() => alert('Tinh năng đang được phát triển!')}
        >
          <Ionicons name="cart" size={24} color="white" />
          <Text className="text-white font-black text-lg ml-3">Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}