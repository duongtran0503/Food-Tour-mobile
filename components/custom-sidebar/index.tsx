import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook dịch
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  badge?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress, badge }) => (
  <TouchableOpacity onPress={onPress} className="flex-row items-center py-4 px-3 active:bg-slate-50 rounded-xl">
    <View className="w-10 items-center">
      <Ionicons name={icon} size={22} color="#1e293b" />
    </View>
    <Text className="flex-1 text-base font-semibold text-slate-800 ml-1">{label}</Text>
    {badge && (
      <View className="bg-blue-100 px-3 py-1 rounded-full mr-2">
        <Text className="text-blue-700 text-xs font-bold">{badge}</Text>
      </View>
    )}
    <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
  </TouchableOpacity>
);

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const router = useRouter();
  const { t } = useTranslation(); 

  const handleSignOut = () => {
    console.log("Đang đăng xuất...");
    props.navigation.closeDrawer(); 
    router.replace('/(auth)/login'); 
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      {/* 1. Phần Header */}
      <View className="items-center pt-8 pb-6 border-b border-slate-100">
        <View className="w-24 h-24 rounded-full bg-slate-100 items-center justify-center shadow-lg shadow-black/20 border-4 border-white mb-4">
          <Image 
            source={{ uri: 'https://avatar.iran.liara.run/public/35' }} 
            className="w-20 h-20 rounded-full"
            resizeMode="cover"
          />
        </View>
        <Text className="text-2xl font-extrabold text-slate-950 tracking-tight">Trần Dương</Text>
        <Text className="text-sm text-slate-500 mt-1 mb-5">duong@foodvk.com</Text>
        
        <TouchableOpacity 
          className="bg-slate-100 px-6 py-3 rounded-full active:bg-slate-200"
          onPress={() => {
            props.navigation.closeDrawer();
            router.push('/(tabs)/home'); 
          }}
        >
          <Text className="text-slate-900 font-bold text-sm">
            {t('components.customSidebar.profileSettings')}
          </Text>
        </TouchableOpacity>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 15 }}>
       
        <MenuItem 
          icon="people-outline" 
          label={t('components.customSidebar.invite')} 
          onPress={() => console.log("Mời bạn bè")}
          badge="SGU" 
        />
        <MenuItem 
          icon="gift-outline" 
          label={t('components.customSidebar.gift')} 
          onPress={() => console.log("Gửi quà tặng")} 
        />
        <MenuItem 
          icon="wallet-outline" 
          label={t('components.customSidebar.wallet')} 
          onPress={() => console.log("Ví FoodVK")} 
        />
        <MenuItem 
          icon="help-circle-outline" 
          label={t('components.customSidebar.help')} 
          onPress={() => console.log("Hỗ trợ")} 
        />
         <MenuItem 
          icon="help-circle-outline" 
          label={t('components.customSidebar.language')} 
          onPress={() => router.push('/Language-settings')} 
        />
      </DrawerContentScrollView>

      <View className="px-6 pb-6 pt-4 border-t border-slate-100">
        <TouchableOpacity 
          className="w-full h-14 bg-slate-100 rounded-2xl justify-center items-center active:bg-slate-200"
          onPress={handleSignOut}
        >
          <Text className="text-lg font-bold text-slate-900">
            {t('common.logout')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}