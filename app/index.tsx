import LoadingFullScreen from '@/components/loading-full-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkNavigation = async () => {
      try {
        // 1. Kiểm tra xem đã xem Onboarding chưa
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        
        // 2. Kiểm tra xem có Token đăng nhập không
        const token = await SecureStore.getItemAsync('userToken');
        console.log("Token in Index.tsx:", token); // Debug log

        // Giả lập delay 1s để hiển thị loading/logo
        setTimeout(() => {
          if (hasLaunched === null) {
            // Lần đầu vào app -> Onboarding
            router.replace('/onboarding');
          } else if (!token) {
            // Đã xem onboarding nhưng chưa đăng nhập hoặc đã đăng xuất
            router.replace('/login');
          } else {
            // Đã có token -> Vào thẳng Home
            router.replace('/home');
          }
        }, 1000);
      } catch (e) {
        router.replace('/login');
      }
    };

    checkNavigation();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <LoadingFullScreen visible={true} />
    </SafeAreaView>
  );
}