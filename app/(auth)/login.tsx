import logo from "@/assets/images/logo_food_app.png";
import LoginForm from "@/components/login-form";
import { SocialButtons } from '@/components/SocialButtons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View className="flex-row justify-between items-center px-6 py-2">
            <TouchableOpacity />
            <View className="flex-row items-center">
              <Text className="text-white/80 mr-2">
                {t('screens.login.no_account')}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
                <Text className="text-white font-bold underline">
                  {t('screens.login.register_now')}
                </Text>
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

          {/* Main Login Card */}
          <View className="flex-1 bg-white rounded-t-[40px] px-8 pt-10 shadow-2xl">
            <View className="items-center mb-8">
              <Text className="text-3xl font-bold text-slate-800">
                {t('screens.login.welcome_back')}
              </Text>
              <Text className="text-slate-400 mt-1 text-center">
                {t('screens.login.subtitle')}
              </Text>
            </View>

            {/* Lưu ý: Bạn cũng nên i18n hóa các placeholder bên trong LoginForm */}
            <LoginForm />

            {/* Social Login Section */}
            <View className="mt-8">
              <View className="flex-row items-center justify-center gap-x-4 mb-6">
                <View className="h-[1px] flex-1 bg-slate-100" />
                <Text className="text-slate-400 font-medium text-sm uppercase">
                  {t('screens.login.or_social')}
                </Text>
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