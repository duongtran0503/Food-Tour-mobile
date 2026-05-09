import { ProfileForm } from '@/components/user-profile';
import { useProfile } from '@/hooks/useProfile';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { control, handleSubmit, errors, isLoading, userData, isDirty } = useProfile();
   console.log("🚀 ~ file: profile.tsx:9 ~ ProfileScreen ~ userData:", userData)
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Avatar Section */}
        <View className="items-center my-8">
          <View className="relative">
            <Image 
              source={{ uri: userData?.avatar || 'https://via.placeholder.com/150' }} 
              className="w-32 h-32 rounded-full border-4 border-slate-100"
            />
            {/* Nút thay đổi ảnh (nếu cần) */}
            <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Text className="text-white text-xs">Sửa</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold mt-4 text-slate-900">{userData?.fullName}</Text>
          <Text className="text-slate-500">{userData?.email}</Text>
        </View>

        {/* Form Section */}
        <View className="px-6">
          <ProfileForm 
            control={control}
            errors={errors}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isDirty={isDirty}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}