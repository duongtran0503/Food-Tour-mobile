import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ALL_RESTAURANTS = [
  { id: '1', name: 'Ốc Oanh Vĩnh Khánh', type: 'Hải sản', price: '40k-250k', rating: 5, location: 'Quận 4, TP.HCM', image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg' },
  { id: '2', name: 'Phá Lấu Cô Lài', type: 'Ăn vặt', price: '45k-200k', rating: 4, location: 'Quận 4, TP.HCM', image: 'https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg' },
  { id: '3', name: 'Chè Hà Trâm', type: 'Tráng miệng', price: '30k-100k', rating: 5, location: 'Quận 4, TP.HCM', image: 'https://owa.bestprice.vn/images/articles/uploads/an-gi-o-vinh-khanh-top-10-quan-an-ngon-bo-re-ban-khong-the-bo-lo-6320397759c63.jpg' },
];

export default function AllRestaurantsScreen() {
  const router = useRouter();
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()

  // Định nghĩa lại mảng filters dùng key của i18n
  const filters = [
    { key: 'all', label: t('screens.all_restaurants.filters.all') },
    { key: 'seafood', label: t('screens.all_restaurants.filters.seafood') },
    { key: 'snacks', label: t('screens.all_restaurants.filters.snacks') },
    { key: 'dessert', label: t('screens.all_restaurants.filters.dessert') },
    { key: 'hotpot_bbq', label: t('screens.all_restaurants.filters.hotpot_bbq') },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const renderRestaurantItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: "/restaurant/detail/[id]", params: { id: item.id } })}
      className="flex-row bg-white p-2 rounded-3xl mb-4 border border-gray-300"
    >
      <View className="relative">
        <Image source={{ uri: item.image }} className="w-28 h-28 rounded-2xl" />
        <TouchableOpacity className="absolute top-2 left-2 bg-white/80 p-1.5 rounded-full">
          <Ionicons name="heart-outline" size={16} color="#930004" />
        </TouchableOpacity>
        <View className="absolute bottom-2 right-2 bg-[#930004] px-2 py-1 rounded-lg">
          <Text className="text-white text-[10px] font-bold">{item.price}</Text>
        </View>
      </View>

      <View className="flex-1 ml-4 justify-between py-1">
        <View>
          <View className="bg-red-50 self-start px-2 py-0.5 rounded-md mb-1">
            <Text className="text-[#930004] text-[10px] font-bold">{item.type}</Text>
          </View>
          <Text className="text-lg font-black text-slate-900" numberOfLines={1}>{item.name}</Text>
          
          <View className="flex-row items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons 
                key={star} 
                name="star" 
                size={12} 
                color={star <= item.rating ? "#fbbf24" : "#e2e8f0"} 
              />
            ))}
          </View>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={14} color="#64748b" />
          <Text className="ml-1 text-slate-400 text-xs">{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#930004] pt-14 pb-6 px-6 rounded-b-[40px]">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-black text-xl">
            {t('screens.all_restaurants.header_title')}
          </Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-white/20 rounded-2xl px-4 py-3 border border-white/30">
           <TextInput 
             className="flex-1 text-white font-bold" 
             placeholder={t('screens.all_restaurants.search_placeholder')}
             placeholderTextColor="rgba(255,255,255,0.6)"
             defaultValue="Vĩnh Khánh, Quận 4"
           />
           <Ionicons name="close-circle" size={20} color="white" />
        </View>
      </View>

      <View className="flex-1 px-6 pt-6">
        {/* Filter Tags */}
        <View className="mb-6">
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filters}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => setActiveFilter(item.key)}
                className={`mr-3 px-4 py-2 rounded-xl border ${activeFilter === item.key ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'}`}
              >
                <View className="flex-row items-center">
                  <Text className={`font-bold text-xs ${activeFilter === item.key ? 'text-[#930004]' : 'text-slate-400'}`}>
                    {item.label}
                  </Text>
                  {activeFilter === item.key && <Ionicons name="close" size={12} color="#930004" className="ml-1" />}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Số lượng kết quả */}
        <Text className="text-slate-900 font-black text-xl mb-4">
          <Text className="text-[#930004]">60</Text> {t('screens.all_restaurants.results_found', { count: 60 }).replace('60', '')}
        </Text>

        <FlatList
          data={ALL_RESTAURANTS}
          renderItem={renderRestaurantItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </View>
  );
}