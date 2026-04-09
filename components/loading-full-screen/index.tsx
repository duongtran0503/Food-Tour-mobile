import Logo from '@/components/logo';
import React from 'react';
import { ActivityIndicator, Modal, Text, View } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export default function LoadingFullScreen({ visible, message }: LoadingOverlayProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 bg-white/90 justify-center items-center">
        <View className="items-center">
          {/* Logo Container */}
          <View className="w-28 h-28 bg-primary rounded-full mb-6 justify-center items-center shadow-xl shadow-primary/40">
            <Logo />
          </View>
          
          <Text className="text-4xl font-extrabold text-primary tracking-tighter">
            FoodVK
          </Text>
          
          <View className="mt-8 items-center">
            <ActivityIndicator size="small" color="#930004" />
            {message && (
              <Text className="text-primary/60 mt-4 font-medium text-sm">
                {message}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}