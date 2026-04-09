import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import i18n
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation(); 
  const [step, setStep] = useState(1);

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const images = {
    1: "https://cdn-icons-png.flaticon.com/512/3321/3321473.png",
    2: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    3: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png",
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Nút Bỏ qua */}
      <TouchableOpacity 
        onPress={() => router.replace('/(auth)/login')} 
        className="items-end"
      >
        <Text className="text-slate-400 font-bold text-lg">
          {t('screens.onboarding.skip')}
        </Text>
      </TouchableOpacity>

      <View className="flex-1 justify-center items-center">
        {/* Hình ảnh minh họa */}
        <View className="w-72 h-72 bg-slate-50 rounded-full mb-10 justify-center items-center border border-slate-100 shadow-sm">
          <Image 
            source={{ uri: images[step as keyof typeof images] }}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Tiêu đề & Nội dung lồng động theo step */}
        <Text className="text-4xl font-black text-slate-800 text-center mb-4 tracking-tight">
          {t(`screens.onboarding.step${step}.title`)}
        </Text>
        <Text className="text-lg text-slate-500 text-center px-6 leading-7">
          {t(`screens.onboarding.step${step}.description`)}
        </Text>

        {/* Thanh phân trang */}
        <View className="flex-row mt-12 items-center justify-center">
          {[1, 2, 3].map((i) => (
            <View 
              key={i}
              className={`h-2 rounded-full mx-1 transition-all ${step === i ? 'bg-primary w-8' : 'bg-slate-200 w-2'}`} 
            />
          ))}
        </View>
      </View>

      {/* Nút Điều hướng đáy */}
      <View className="flex-row space-x-4">
        {step > 1 && (
          <TouchableOpacity 
            onPress={() => setStep(step - 1)}
            className="flex-1 h-16 border-2 border-slate-100 rounded-2xl justify-center items-center mr-2"
          >
            <Text className="text-xl font-bold text-slate-400">
              {t('screens.onboarding.back')}
            </Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={handleNext}
          className="flex-1 h-16 bg-primary rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-xl font-bold text-white">
            {step === 3 ? t('screens.onboarding.start') : t('screens.onboarding.next')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}