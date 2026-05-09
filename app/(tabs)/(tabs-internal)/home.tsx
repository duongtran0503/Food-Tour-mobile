import FoodForYou from '@/components/home-component/food-for-you';
import SalesFood from '@/components/home-component/sales-food';
import HomeToursSection from '@/components/home-tour-section';
import RestaurantCard from '@/components/restaurant-card';
import SearchBar from '@/components/search-bar';
import { useHome } from '@/hooks/useHome';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const  {
        t,
        router,
        restaurants,
        categoryData,
    } = useHome()
  
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      
    {/* HEADER */}
<View className="h-64"> {/* Cố định chiều cao cho Header có ảnh */}
  <ImageBackground
    source={require('@/assets/images/banner.png')} 
    className="flex-1"
    resizeMode="cover"
  >
    {/* Overlay màu tối để chữ dễ đọc hơn */}
    <View className="flex-1 bg-black/20 pb-12"> 
      <SafeAreaView edges={['top']}>
        <View className="flex-row items-center justify-between px-6 py-4">
          <View>
            <Text className="text-white/90 text-xs font-bold uppercase tracking-widest shadow-sm">
              {t('screens.home.welcome')}
            </Text>
            <Text className="text-4xl font-black text-white italic shadow-lg">
              FoodVK
            </Text>
          </View>
          <TouchableOpacity className="w-12 h-12 bg-white/30 rounded-2xl justify-center items-center backdrop-blur-md border border-white/20">
            <Ionicons name="cart-outline" size={24} color="white" />
            <View className="absolute -top-1 -right-1 bg-primary w-5 h-5 rounded-full justify-center items-center border border-white">
              <Text className="text-white text-[10px] font-black">3</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="px-6 mt-4 z-50">
          <SearchBar />
        </View>
      </SafeAreaView>
    </View>
  </ImageBackground>
</View>
      {/* CONTENT */}
      <View className="flex-1 bg-white rounded-t-[40px] -mt-8 shadow-2xl overflow-hidden">
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }} 
        >
          {/* Danh mục */}
          <View className="mb-4">
             <Text className="px-4 text-xl font-extrabold text-slate-800 mb-5">
               {t('screens.home.categories')}
             </Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-2">
              {categoryData.map((item, index) => (
                <View key={index} className="items-center mr-6">
                  <TouchableOpacity className={`w-16 h-16 rounded-2xl justify-center items-center border border-slate-100 shadow-md bg-white  
                     `}>
                    {item.promo ? <Ionicons name="pricetag" size={26} color="#930004" /> : <Text className="text-3xl">{item.img}</Text>}
                  </TouchableOpacity>
                  <Text className="text-[11px] font-bold text-slate-500 mt-2">{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Chuyến đi */}
           <HomeToursSection/>
          {/* Quán ăn nổi tiếng */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between px-4 py-2 mb-2">
              <View className="flex-row items-center">
                <Ionicons name="restaurant" size={22} color="#930004" /> 
                <Text className="ml-2 font-black text-lg text-slate-900">
                  {t('screens.home.popular_restaurants')}
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/restaurant/all")}>
                <Text className="text-[#930004] font-bold text-sm">
                  {t('screens.home.view_all')}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-2">
              {restaurants.map((restaurant) => (
                <View key={restaurant.id} className="mr-2">
                  <RestaurantCard restaurant={restaurant} />
                </View>
              ))}
            </ScrollView>
          </View>
          {/* Khuyến mãi */}
           <SalesFood/>
          {/* Dành riêng cho bạn */}
           <FoodForYou/>
        </ScrollView>
      </View>
    </View>
  );
}