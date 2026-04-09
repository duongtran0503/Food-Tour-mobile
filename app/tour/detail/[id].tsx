import ButtonBack from '@/components/button-back';
import TourReviews from '@/components/tour-review';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TourDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const router = useRouter();
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()

  // Giữ nguyên mock data của Dương
  const tourData = {
    title: "Thiên Đường Ốc Đêm Vĩnh Khánh",
    price: "250.000đ - 400.000đ",
    image: 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg',
    rating: "4.9",
    description: "Khám phá những quán ốc nức tiếng nhất quận 4 với lộ trình được tối ưu. Bạn sẽ được thưởng thức từ ốc hương trứng muối đến càng ghẹ rang muối tuyết.",
    stops: [
      { 
        place: "Ốc Oanh", 
        dish: "Ốc hương sốt trứng muối", 
        image: 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg',
        desc: "Quán ốc nổi tiếng nhất phố Vĩnh Khánh với hương vị đậm đà.",
        route: "/restaurant/oc-oanh"
      },
      { 
        place: "Ốc Đào 2", 
        dish: "Càng ghẹ rang muối", 
        image: 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg',
        desc: "Không gian rộng rãi, phù hợp cho nhóm bạn đông người.",
        route: "/restaurant/oc-dao"
      },
      { 
        place: "Chè Hà Trâm", 
        dish: "Chè mâm 12 món", 
        image: 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg',
        desc: "Kết thúc tour bằng những món chè ngọt ngào, mát lạnh.",
        route: "/restaurant/che-ha-tram"
      },
    ]
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <SafeAreaView className="absolute top-0 left-0 right-0 z-50 px-5 py-2 flex-row justify-between items-center">
      <ButtonBack/>

        <TouchableOpacity 
          className="w-12 h-12 bg-black/40 rounded-full items-center justify-center border border-white/20"
        >
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="relative h-96">
          <Image source={{ uri: tourData.image }} className="w-full h-full" />
        </View>

        <View className="bg-white -mt-12 rounded-t-[50px] px-6 pt-10">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <Text className="text-3xl font-black text-slate-900">{tourData.title}</Text>
              <View className="flex-row items-center mt-2 bg-slate-100 self-start px-3 py-1 rounded-full">
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text className="ml-1 text-slate-600 font-bold">{tourData.rating}</Text>
              </View>
            </View>
          </View>

          <View className="mt-2">
            <Text className="text-[#930004] font-black text-xl">{tourData.price}</Text>
          </View>

          <Text className="text-slate-500 mt-6 leading-6 text-base">{tourData.description}</Text>

          {/* 3. Dịch tiêu đề điểm đến */}
          <Text className="text-2xl font-black text-slate-900 mt-10 mb-6">
            {t('screens.tour_detail.destinations_title')}
          </Text>
          
          {tourData.stops.map((item, index) => (
            <View key={index} className="flex-row">
              <View className="items-center w-6 mr-2">
                <View className="w-4 h-4 bg-[#930004] rounded-full border-2 border-red-200 z-10" />
                {index !== tourData.stops.length - 1 && (
                  <View className="w-[2px] flex-1 bg-slate-200 -my-1" />
                )}
              </View>

              <View className="flex-1 pb-8 ">
                <View className="bg-white rounded-3xl border shadow-2xl border-slate-100 overflow-hidden">
                  <Image source={{ uri: item.image }} className="w-full h-44" resizeMode="cover" />
                  <View className="p-4">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="font-black text-slate-900 text-lg">{item.place}</Text>
                      <View className="bg-green-100 px-2 py-1 rounded-lg">
                        {/* 4. Dịch nhãn Phổ biến */}
                        <Text className="text-green-700 text-[10px] font-bold uppercase">
                          {t('screens.tour_detail.popular_tag')}
                        </Text>
                      </View>
                    </View>
                    
                    <Text className="text-[#930004] font-bold text-sm mb-2">🍴 {item.dish}</Text>
                    <Text className="text-slate-500 text-sm mb-4">{item.desc}</Text>

                    <TouchableOpacity 
                      onPress={() => router.push(item.route as any)}
                      className="bg-slate-900 py-3 rounded-xl items-center flex-row justify-center"
                    >
                      {/* 5. Dịch nút Xem chi tiết */}
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

        {/* 6. Dịch tiêu đề đánh giá */}
        <Text className="px-6 text-2xl font-black text-slate-900 mt-10">
          {t('screens.tour_detail.reviews_title')}
        </Text>
        <TourReviews />
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-0 w-full p-6 bg-white/90 border-t border-slate-100">
        <TouchableOpacity 
          onPress={() => router.push({ pathname: "/tour/map/[id]", params: { id: "" + id } })}
          className="bg-[#930004] h-16 rounded-2xl items-center justify-center shadow-lg shadow-red-900/20"
        >
          {/* 7. Dịch nút Bắt đầu hành trình */}
          <Text className="text-white font-black text-lg uppercase tracking-widest">
            {t('screens.tour_detail.start_journey')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}