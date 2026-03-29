import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1); // Quản lý 3 bước: 1, 2, 3

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  // Nội dung cho từng bước
  const onboardingData = {
    1: {
      title: "Thiên Đường Ốc",
      description: "Khám phá hàng trăm quán ốc nổi tiếng dọc phố Vĩnh Khánh, từ ốc bình dân đến hải sản cao cấp.",
      image: "https://cdn-icons-png.flaticon.com/512/3321/3321473.png", // Bạn thay bằng ảnh ốc/biển
    },
    2: {
      title: "Bản Đồ Ẩm Thực",
      description: "Dễ dàng tìm kiếm vị trí các quán ăn ngon nhất Quận 4 với chỉ dẫn đường đi chính xác.",
      image: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // Bạn thay bằng ảnh map
    },
    3: {
      title: "Trải Nghiệm FoodVK",
      description: "Đặt bàn trước, săn deal độc quyền và chia sẻ cảm nhận ẩm thực cùng cộng đồng Foodie.",
      image: "https://cdn-icons-png.flaticon.com/512/3170/3170733.png", // Bạn thay bằng ảnh logo app
    }
  };

  const currentData = onboardingData[step as keyof typeof onboardingData];

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      {/* Nút Bỏ qua */}
      <TouchableOpacity 
        onPress={() => router.replace('/(auth)/login')} 
        className="items-end"
      >
        <Text className="text-slate-400 font-bold text-lg">Bỏ qua</Text>
      </TouchableOpacity>

      <View className="flex-1 justify-center items-center">
        {/* Hình ảnh minh họa */}
        <View className="w-72 h-72 bg-slate-50 rounded-full mb-10 justify-center items-center border border-slate-100 shadow-sm">
          <Image 
            source={{ uri: currentData.image }}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Tiêu đề & Nội dung */}
        <Text className="text-4xl font-black text-slate-800 text-center mb-4 tracking-tight">
          {currentData.title}
        </Text>
        <Text className="text-lg text-slate-500 text-center px-6 leading-7">
          {currentData.description}
        </Text>

        {/* Thanh phân trang (Pagination Dots) */}
        <View className="flex-row mt-12 items-center justify-center">
          <View className={`h-2 rounded-full mx-1 transition-all ${step === 1 ? 'bg-primary w-8' : 'bg-slate-200 w-2'}`} />
          <View className={`h-2 rounded-full mx-1 transition-all ${step === 2 ? 'bg-primary w-8' : 'bg-slate-200 w-2'}`} />
          <View className={`h-2 rounded-full mx-1 transition-all ${step === 3 ? 'bg-primary w-8' : 'bg-slate-200 w-2'}`} />
        </View>
      </View>

      {/* Nút Điều hướng đáy */}
      <View className="flex-row space-x-4">
        {step > 1 && (
          <TouchableOpacity 
            onPress={() => setStep(step - 1)}
            className="flex-1 h-16 border-2 border-slate-100 rounded-2xl justify-center items-center"
          >
            <Text className="text-xl font-bold text-slate-400">Quay lại</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={handleNext}
          className="flex-1 h-16 bg-primary rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-xl font-bold text-white">
            {step === 3 ? "Bắt đầu ngay" : "Tiếp theo"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}