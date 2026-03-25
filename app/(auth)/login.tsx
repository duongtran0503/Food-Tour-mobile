import { SocialButtons } from '@/components/SocialButtons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* 1. Phần Logo và Tên FoodVK */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Placeholder cho Logo (Dương và Ân có thể nhét SVG/Image của bạn vào đây) */}
        <View className="w-28 h-28 bg-slate-100 rounded-full mb-6 justify-center items-center">
          <Text className="text-slate-400">Logo</Text>
        </View>
        
        <Text className="text-5xl font-extrabold text-primary">
          FoodVK
        </Text>
      </View>

      {/* 2. Phần Các Nút Bấm Điều hướng */}
      <View className="p-6 pb-12 space-y-5">
        
        {/* Nút Đăng nhập */}
        <TouchableOpacity 
          onPress={() => router.replace('/home')}
          className="w-full h-14 border border-primary rounded-full justify-center items-center active:opacity-70"
        >
          <Text className="text-xl font-bold text-primary">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        {/* Nút Facebook & Google tách riêng */}
        <SocialButtons />

        <View className="flex-row justify-center items-center">
          <Text className="text-base text-slate-500 font-medium">hoặc</Text>
        </View>

        {/* Nút Tạo tài khoản */}
        <TouchableOpacity 
          onPress={() => router.push('/(auth)/register' as any)}
          className="w-full h-14 bg-primary rounded-full justify-center items-center shadow-lg active:opacity-70"
        >
          <Text className="text-xl font-bold text-white">
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}