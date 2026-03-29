import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
export function SmallFoodCard({ name, rate, time, price, promo }: any) {
    return (
      <View className="w-48 mr-5 bg-white border border-slate-100 rounded-3xl p-2 shadow-sm">
        <View className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden justify-center items-center">
          {promo && <View className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-lg z-10"><Text className="text-white text-[9px] font-black">GIẢM SỐC</Text></View>}
          <Ionicons name="fast-food" size={40} color="#cbd5e1" />
          <View className="absolute bottom-2 right-2 bg-white/95 px-2 py-1 rounded-full flex-row items-center">
             <Ionicons name="star" size={10} color="#f59e0b" />
             <Text className="text-[10px] font-black ml-1">{rate}</Text>
          </View>
        </View>
        <View className="px-1.5 py-3">
          <Text className="font-extrabold text-slate-800 text-sm" numberOfLines={1}>{name}</Text>
          <Text className="text-[10px] text-slate-400 mt-1">{time} • Phí ship: {price}</Text>
        </View>
      </View>
    );
  }
  
  export function BigFoodCard({ name, rate, time, price, tag, discount }: any) {
      return (
        <View className="w-[48%] mb-6">
          <View className="h-44 bg-slate-100 rounded-[30px] overflow-hidden">
               <View className="flex-1 items-center justify-center">
                  <Ionicons name="restaurant" size={50} color="#cbd5e1" />
               </View>
               {discount && (
                  <View className="absolute top-3 left-3 bg-primary px-2 py-1 rounded-xl">
                      <Text className="text-white text-[10px] font-black">-{discount}</Text>
                  </View>
               )}
               <View className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-full flex-row items-center">
                  <Ionicons name="star" size={12} color="#f59e0b" />
                  <Text className="text-[10px] font-black ml-1">{rate}</Text>
               </View>
          </View>
          <Text className="font-extrabold text-slate-800 mt-3 text-base" numberOfLines={1}>{name}</Text>
          <View className="flex-row items-center mt-1 flex-wrap">
              <Text className="text-[11px] text-slate-400">{time} • {price} • </Text>
              <Text className="text-[11px] text-primary font-bold">{tag}</Text>
          </View>
        </View>
      );
  }