import logo from "@/assets/images/logo_food_app.png";
import LoginForm from "@/components/login-form";
import { SocialButtons } from '@/components/SocialButtons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View className="flex-row justify-between items-center px-6 py-2">
            <TouchableOpacity />
            <View className="flex-row items-center">
              <Text className="text-white/80 mr-2">Chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
                <Text className="text-white font-bold underline">Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="items-center py-4">
            <View className="w-24 h-24 bg-white/20 rounded-3xl justify-center items-center backdrop-blur-md">
              <Image
                source={logo}
                style={{ width: 70, height: 70 }}
                contentFit="contain"
              />
            </View>
            <Text className="text-4xl font-black text-white mt-4 tracking-tighter">
              FoodVK
            </Text>
          </View>

          {/* 2. Main Login Card */}
          <View className="flex-1 bg-white rounded-t-[40px] px-8 pt-10 shadow-2xl">
            <View className="items-center mb-8">
              <Text className="text-3xl font-bold text-slate-800">Chào quay lại!</Text>
              <Text className="text-slate-400 mt-1">Nhập thông tin để khám phá Vĩnh Khánh</Text>
            </View>

            {/* Gọi Component Form đã tách */}
            <LoginForm />

            {/* Social Login Section */}
            <View className="mt-8">
              <View className="flex-row items-center justify-center gap-x-4 mb-6">
                <View className="h-[1px] flex-1 bg-slate-100" />
                <Text className="text-slate-400 font-medium text-sm uppercase">Hoặc đăng nhập bằng</Text>
                <View className="h-[1px] flex-1 bg-slate-100" />
              </View>
              
              <SocialButtons />
            </View>

            <View className="h-10" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}