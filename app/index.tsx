import LoadingFullScreen from '@/components/loading-full-screen';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 1000);
    console.log("Đang hiển thị")
    return () => clearTimeout(timer); 
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
     <LoadingFullScreen visible={true} />
    </SafeAreaView>
  );
}