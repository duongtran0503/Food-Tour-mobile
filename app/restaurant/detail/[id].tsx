import ButtonBack from '@/components/button-back';
import MenuItemRestaurant from '@/components/restaurant-detail-screen/item-menu';
import { SpeechControls } from '@/components/restaurant-detail-screen/SpeechControls';
import { restaurant } from '@/constants/data-demo';
import { useRestaurantSpeech } from '@/hooks/useRestaurantSpeech';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Dimensions, Image, ScrollView, StatusBar, Text, TouchableOpacity, View, } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
const { isSpeaking, isPaused, handleStart, handlePauseResume, handleStop } = useRestaurantSpeech(restaurant);
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="absolute top-0 left-0 right-0 z-50 px-5 flex-row justify-between">
            <ButtonBack/>
        <TouchableOpacity className="w-10 h-10 bg-black/30 rounded-full items-center justify-center">
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View className="bg-white -mt-10 rounded-t-[40px] px-6 pt-8">
          <View className='flex-col justify-between items-center'>
            <Text className="text-3xl font-black text-slate-900 flex-1">{restaurant.name}</Text>

            <View className="mt-2">
              <SpeechControls 
                isSpeaking={isSpeaking}
                isPaused={isPaused}
                onStart={handleStart}
                onPauseResume={handlePauseResume}
                onStop={handleStop}
              />
            </View>
          </View>
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

          <Text className="text-2xl font-black text-slate-900 mt-10 mb-4">Thực đơn nhà hàng</Text>
          <View className="flex-row flex-wrap -mx-2 pb-20">
            {restaurant.menu.map((item) => (
              <View key={item.id} style={{ width: '50%' }}>
                 <MenuItemRestaurant item={item}/>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}