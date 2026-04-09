import logo from "@/assets/images/logo_food_app.png";
import RegisterForm from "@/components/register-form";
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next'; // 1. Import hook và Trans component
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
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()

  return (
    <View className="flex-1 bg-primary">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView className="flex-1">
            <ScrollView 
              contentContainerStyle={{ flexGrow: 1 }} 
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              
              {/* Header */}
              <View className="flex-row justify-between items-center px-6 py-2">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                  <Text className="text-white/80 mr-2">
                    {t('screens.register.already_have_account')}
                  </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text className="text-white font-bold underline">
                      {t('screens.register.login_now')}
                    </Text>
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
                  <Text className="text-3xl font-bold text-slate-800">
                    {t('screens.register.create_account')}
                  </Text>
                  <Text className="text-slate-400 mt-1 text-center px-4">
                    {t('screens.register.subtitle')}
                  </Text>
                </View>

                {/* Phần Form */}
                <RegisterForm />

                {/* Văn bản pháp lý dùng Trans component để format text in đậm bên trong chuỗi dịch */}
                <View className="mt-8 mb-10 items-center">
                  <Text className="text-slate-400 text-sm text-center leading-5 px-6">
                    <Trans 
                        i18nKey="screens.register.terms_agreement"
                        components={[
                            <Text key="0" className="text-slate-600 font-bold" />,
                            <Text key="1" className="text-slate-600 font-bold" />
                        ]}
                    />
                  </Text>
                </View>
                
                <View className="h-full flex-1" />
              </View>

            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
    </View>
  );
}