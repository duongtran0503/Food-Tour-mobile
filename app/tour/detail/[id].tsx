import ButtonBack from '@/components/button-back';
import TourReviews from '@/components/tour-review';
import apiClient from '@/config/axios-config';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TourDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['tourDetail', id, i18n.language],
    queryFn: async () => {
      const res = await apiClient.get(`/tours/details/${id}`);
      return res.data; // Trả về object chứa { data, code, message... }
    },
    enabled: !!id,
  });

  // Truy cập sâu vào trường data theo cấu trúc API trả về
  const tourData = response;
  console.log("Fetched tour data:", tourData); // Debug log để kiểm tra dữ liệu nhận được

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#930004" />
      </View>
    );
  }

  if (isError || !tourData) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-slate-500 mb-4">{t('common.error_loading')}</Text>
        <TouchableOpacity onPress={() => router.back()} className="bg-slate-900 px-6 py-2 rounded-full">
          <Text className="text-white">{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <SafeAreaView className="absolute top-0 left-0 right-0 z-50 px-5 py-2 flex-row justify-between items-center">
        <ButtonBack />
        <View className="flex-row">
          <TouchableOpacity 
            onPress={() => router.push({ pathname: "/tour/share/[id]", params: { id: ""+id } })}
            className="w-12 h-12 bg-black/40 rounded-full items-center justify-center border border-white/20 mr-2"
          >
            <Ionicons name="share-social-outline" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 bg-black/40 rounded-full items-center justify-center border border-white/20">
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* API trả về trường 'image' là string đơn */}
        <View className="relative h-96">
          <Image 
            source={{ uri: tourData.image || 'https://via.placeholder.com/400' }} 
            className="w-full h-full" 
          />
        </View>

        <View className="bg-white -mt-12 rounded-t-[50px] px-6 pt-10">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <Text className="text-3xl font-black text-slate-900">{tourData.title} </Text>
              <View className="flex-row items-center mt-2 bg-slate-100 self-start px-3 py-1 rounded-full">
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text className="ml-1 text-slate-600 font-bold">{tourData.rating}</Text> 
              </View>
            </View>
          </View>

          <View className="mt-2">
            <Text className="text-[#930004] font-black text-xl">{tourData.price}</Text>
          </View>

          <Text className="text-slate-500 mt-6 leading-6 text-base">
            {tourData.description || t('screens.tour_detail.no_description')}
          </Text>

          <Text className="text-2xl font-black text-slate-900 mt-10 mb-6">
            {t('screens.tour_detail.destinations_title')}
          </Text>
          
          {/* Sửa mapping sang 'stops' theo data nhận được */}
          {tourData.stops?.map((item: any, index: number) => (
            <View key={item.id || index} className="flex-row">
              <View className="items-center w-6 mr-2">
                <View className="w-4 h-4 bg-[#930004] rounded-full border-2 border-red-200 z-10" />
                {index !== tourData.stops.length - 1 && (
                  <View className="w-[2px] flex-1 bg-slate-200 -my-1" />
                )}
              </View>

              <View className="flex-1 pb-8">
                <View className="bg-white rounded-3xl border shadow-sm border-slate-100 overflow-hidden">
                  <Image 
                    source={{ uri: item.image }} 
                    className="w-full h-44" 
                    resizeMode="cover" 
                  />
                  <View className="p-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-black text-slate-900 text-lg">{item.place || "Địa điểm chưa cập nhật"}</Text>
                      <View className="bg-green-100 px-2 py-1 rounded-lg">
                        <Text className="text-green-700 text-[10px] font-bold uppercase">
                          {t('screens.tour_detail.popular_tag')}
                        </Text>
                      </View>
                    </View>
                    
                    <Text className="text-[#930004] font-bold text-sm mb-2">🍴 {item.dish}</Text>
                    <Text className="text-slate-500 text-sm mb-4" numberOfLines={2}>
                        {item.desc || t('screens.tour_detail.default_rest_desc')}
                    </Text>

                    <TouchableOpacity 
                      onPress={() =>{
                         router.push({ pathname: "/restaurant/detail/[id]", params: { id: item.id } })
                         console.log("Đi đến chi tiết nhà hàng với ID:", item.id);
                      }}
                      className="bg-slate-900 py-3 rounded-xl items-center flex-row justify-center"
                    >
                      <Text className="text-white font-bold text-sm mr-2">
                        {t('screens.tour_detail.view_restaurant')}
                      </Text>
                      <Ionicons name="arrow-forward" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Text className="px-6 text-2xl font-black text-slate-900 mt-10">
          {t('screens.tour_detail.reviews_title')}
        </Text>
        <TourReviews />
      </ScrollView>

      <View className="absolute bottom-0 w-full p-6 bg-white/95 border-t border-slate-100">
        <TouchableOpacity 
          onPress={() => router.push({ pathname: "/tour/map/[id]", params: { id: "" + id } })}
          className="bg-[#930004] h-16 rounded-2xl items-center justify-center shadow-lg shadow-red-900/20"
        >
          <Text className="text-white font-black text-lg uppercase tracking-widest">
            {t('screens.tour_detail.start_journey')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}