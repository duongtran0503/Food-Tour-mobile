import Logo from '@/components/logo';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      {/* Hiện Logo FoodVK to giữa màn hình */}
      <View className="items-center">
        <View className="w-32 h-32 bg-primary rounded-full mb-6 justify-center items-center shadow-xl shadow-primary/40">
           <Logo/>
        </View>
        <Text className="text-5xl font-extrabold text-primary tracking-tighter">
          FoodVK
        </Text>
        <ActivityIndicator size="small" color="#930004" className="mt-8" />
      </View>
    </SafeAreaView>
  );
}