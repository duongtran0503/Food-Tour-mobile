import logo from "@/assets/images/logo_food_app.png";
import RegisterForm from "@/components/register-form";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Keyboard,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      
      {/* 1. Bọc KeyboardAvoidingView để xử lý việc đẩy UI khi hiện bàn phím */}
  
        {/* 2. Cho phép bấm ra ngoài vùng nhập liệu để ẩn bàn phím */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView className="flex-1">
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1 }} 
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              
              {/* Header với nút quay lại */}
              <View className="flex-row justify-between items-center px-6 py-2">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                  <Text className="text-white/80 mr-2">Đã có tài khoản?</Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text className="text-white font-bold underline">Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="items-center py-4">
                <View className="w-20 h-20 bg-white/20 rounded-3xl justify-center items-center backdrop-blur-md">
                  <Image source={logo} style={{ width: 60, height: 60 }} contentFit="contain" />
                </View>
                <Text className="text-3xl font-black text-white mt-3 tracking-tighter">FoodVK</Text>
              </View>

              {/* Card trắng chứa Form */}
              <View className="flex-1 bg-white rounded-t-[40px] px-8 pt-10 shadow-2xl">
                <View className="items-center mb-6">
                  <Text className="text-3xl font-bold text-slate-800">Tạo tài khoản</Text>
                  <Text className="text-slate-400 mt-1 text-center px-4">Đăng ký để cùng Ân và Dương săn món ngon Vĩnh Khánh</Text>
                </View>

                {/* Phần Form đã được tách logic */}
                <RegisterForm />

                <View className="mt-8 mb-10 items-center">
                  <Text className="text-slate-400 text-sm text-center leading-5 px-6">
                    Bằng cách đăng ký, bạn đồng ý với <Text className="text-slate-600 font-bold">Điều khoản dịch vụ</Text> và <Text className="text-slate-600 font-bold">Chính sách bảo mật</Text> của FoodVK.
                  </Text>
                </View>
                
                {/* Khoảng trống cuối để cuộn mượt hơn khi có bàn phím */}
                <View className="h-full flex-1" />
              </View>

            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
    </View>
  );
}