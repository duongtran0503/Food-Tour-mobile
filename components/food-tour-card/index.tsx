import { TourType } from '@/types/tour';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    tour: TourType;
}

export default function FoodTourCard(props:Props) {
    const { title, image, duration, price, rating, places }: TourType = props.tour;
    const router = useRouter()
  return (
    <TouchableOpacity 
        onPress={() => router.push({ pathname:"/tour/[id]",params:{id:props.tour.id} })}
      className="bg-white rounded-3xl mb-5 shadow-md border border-slate-100 overflow-hidden"
      activeOpacity={0.9}
    >
      {/* Ảnh Tour */}
      <View className="relative">
        <Image 
          source={{ uri: image }} 
          className="w-full h-48" 
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex-row items-center">
          <Ionicons name="star" size={14} color="#fbbf24" />
          <Text className="ml-1 font-bold text-xs">{rating}</Text>
        </View>
        <View className="absolute bottom-3 left-3 bg-primary px-3 py-1 rounded-lg">
          <Text className="text-white font-bold text-xs">{price}</Text>
        </View>
      </View>

      {/* Nội dung Tour */}
      <View className="p-4">
        <Text className="text-lg font-bold text-slate-900 mb-2">{title}</Text>
        
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#64748b" />
            <Text className="ml-1 text-slate-500 text-sm">{duration}</Text>
          </View>
          
          <View className="flex-row items-center">
            <Ionicons name="restaurant-outline" size={16} color="#64748b" />
            <Text className="ml-1 text-slate-500 text-sm">{places} địa điểm</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}