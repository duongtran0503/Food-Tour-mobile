import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export const SocialButtons = () => {
  return (
    <View className="flex-row justify-center items-center space-x-6">
      {/* Nút Facebook */}
      <TouchableOpacity 
        className="w-16 h-16 bg-[#1877F2] rounded-3xl justify-center items-center shadow-lg active:opacity-70"
      >
        <Ionicons name="logo-facebook" size={36} color="white" />
      </TouchableOpacity>

      {/* Nút Google */}
      <TouchableOpacity 
        className="w-16 h-16 bg-white border border-slate-300 rounded-3xl justify-center items-center shadow-lg active:opacity-70"
      >
        <Image 
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" }} 
          className="w-9 h-9"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};