import { RestaurantType } from '@/types/restaurant';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    restaurant: RestaurantType;
}
export default function RestaurantCard({ restaurant }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: "/restaurant/[id]", params: { id: restaurant.id } })}
      className="bg-white rounded-3xl mr-2 shadow-2xl border border-slate-100 overflow-hidden w-64"
      activeOpacity={0.9}
    >
      <View className="relative">
        <Image source={{ uri: restaurant.image }} className="w-full h-36" resizeMode="cover" />
        <View className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex-row items-center">
          <Ionicons name="star" size={12} color="#fbbf24" />
          <Text className="ml-1 font-bold text-[10px]">{restaurant.rating}</Text>
        </View>
      </View>

      <View className="p-3">
        <Text className="text-base font-bold text-slate-900 mb-1" numberOfLines={1}>{restaurant.name}</Text>
        <View className="flex-row items-center">
          <Ionicons name="location-outline" size={12} color="#64748b" />
          <Text className="ml-1 text-slate-500 text-[10px] flex-1" numberOfLines={1}>{restaurant.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}