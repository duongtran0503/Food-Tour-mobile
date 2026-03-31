import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View, } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Dữ liệu giả lập cho nhà hàng
  const restaurant = {
    name: "Ốc Oanh - Vĩnh Khánh",
    rating: "4.8",
    reviews: "1,652",
    openTime: "16:00 - 23:30",
    address: "534 Vĩnh Khánh, Phường 10, Quận 4, TP.HCM",
    phone: "090 123 4567",
    description: "Quán ốc nổi tiếng nhất phố ẩm thực Vĩnh Khánh với không gian rộng rãi và các món hải sản tươi sống được chế biến đậm đà.",
    images: [
      'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg',
      'https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg',
      'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg'
    ],
    menu: [
      { id: '1', name: 'Ốc hương trứng muối', price: '150.000đ', image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg', rating: '5.0', desc: 'Béo ngậy vị trứng muối' },
      { id: '2', name: 'Càng ghẹ rang muối', price: '120.000đ', image: 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg', rating: '4.8', desc: 'Cay nồng, đậm đà' },
      { id: '3', name: 'Sò lông nướng mỡ hành', price: '80.000đ', image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg', rating: '4.7', desc: 'Thơm mùi mỡ hành' },
      { id: '4', name: 'Nghêu hấp thái', price: '90.000đ', image: 'https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg', rating: '4.9', desc: 'Chua cay chuẩn vị' },
    ]
  };

  const renderMenuItem = ({ item }: { item: any }) => (
    <View className="flex-1 p-2">
      <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <View className="relative">
          <Image source={{ uri: item.image }} className="w-full h-40" />
          <View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-lg flex-row items-center">
            <Ionicons name="star" size={10} color="#fbbf24" />
            <Text className="text-white text-[10px] font-bold ml-1">{item.rating}</Text>
          </View>
        </View>
        <View className="p-3">
          <Text className="font-bold text-slate-900 text-sm mb-1" numberOfLines={1}>{item.name}</Text>
          <Text className="text-slate-400 text-[10px] mb-2" numberOfLines={1}>{item.desc}</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-[#930004] font-black text-sm">{item.price}</Text>
            <TouchableOpacity className="bg-[#930004] w-7 h-7 rounded-full items-center justify-center">
              <Ionicons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent />
      {/* Nút Back cố định */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-50 px-5 flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. Slide Ảnh Nhà Hàng */}
        <View className="h-80">
          <Carousel
            loop
            width={width}
            height={320}
            autoPlay={true}
            data={restaurant.images}
            scrollAnimationDuration={1000}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
            )}
          />
        </View>
        {/* 2. Phần Thông Tin Chi Tiết */}
        <View className="bg-white -mt-10 rounded-t-[40px] px-6 pt-8">
          <Text className="text-3xl font-black text-slate-900">{restaurant.name}</Text> 
          <View className="flex-row items-center mt-3">
            <View className="flex-row items-center bg-yellow-100 px-3 py-1 rounded-full">
              <Ionicons name="star" size={14} color="#fbbf24" />
              <Text className="ml-1 font-bold text-yellow-700">{restaurant.rating}</Text>
            </View>
            <Text className="ml-3 text-slate-400 font-medium">({restaurant.reviews} đánh giá)</Text>
          </View>

          <View className="mt-6 space-y-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-3">
                <Ionicons name="time-outline" size={18} color="#3b82f6" />
              </View>
              <Text className="text-slate-600 font-medium">Mở cửa: <Text className="text-slate-900 font-bold">{restaurant.openTime}</Text></Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-red-50 rounded-full items-center justify-center mr-3">
                <Ionicons name="location-outline" size={18} color="#ef4444" />
              </View>
              <Text className="flex-1 text-slate-600 leading-5">{restaurant.address}</Text>
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-50 rounded-full items-center justify-center mr-3">
                <Ionicons name="call-outline" size={18} color="#22c55e" />
              </View>
              <Text className="text-slate-600">{restaurant.phone}</Text>
            </View>
          </View>

          <Text className="text-slate-500 mt-6 leading-6">{restaurant.description}</Text>

          {/* 3. Món Ăn Nổi Bật (Horizontal) */}
          <Text className="text-2xl font-black text-slate-900 mt-10 mb-4">Món nổi bật 🔥</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
            {restaurant.menu.slice(0, 2).map((item) => (
              <View key={item.id} className="mr-4 w-64 bg-slate-50 rounded-3xl p-4 border border-slate-100">
                <Image source={{ uri: item.image }} className="w-full h-32 rounded-2xl mb-3" />
                <Text className="font-bold text-lg">{item.name}</Text>
                <Text className="text-[#930004] font-black">{item.price}</Text>
              </View>
            ))}
          </ScrollView>

          {/* 4. Danh Sách Menu (2 Columns) */}
          <Text className="text-2xl font-black text-slate-900 mt-10 mb-4">Thực đơn nhà hàng</Text>
          <View className="flex-row flex-wrap -mx-2 pb-20">
            {restaurant.menu.map((item) => (
              <View key={item.id} style={{ width: '50%' }}>
                {renderMenuItem({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}