import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native'; // Import action mở drawer
import { useNavigation, usePathname, useRouter } from 'expo-router'; // Thêm useNavigation
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const navigation = useNavigation(); // Hook để điều khiển Sidebar

  const tabs = [
    { name: 'home', icon: 'home', route: '/(tabs)/home' },
    { name: 'notifications', icon: 'notifications', route: '/notifications' },
    { name: 'messages', icon: 'chatbubbles', route: '/messages' },
    { name: 'favorites', icon: 'heart', route: '/favorites' },
    { name: 'profile', icon: 'menu', route: '/profile' },
  ];

  const handlePress = (tab: typeof tabs[0]) => {
    if (tab.name === 'profile') {
      // Nếu là icon profile, mở Sidebar thay vì chuyển trang
      navigation.dispatch(DrawerActions.openDrawer());
    } else {
      // Các tab khác chuyển trang bình thường
      router.push(tab.route as any);
    }
  };

  return (
    <View className="absolute bottom-0 w-full  h-[80px] bg-[#930004] flex-row shadow-2xl">
      {tabs.map((tab, index) => {
        const isActive = pathname.includes(tab.name);
        const isHome = index === 0;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => handlePress(tab)} // Gọi hàm xử lý riêng
            className="flex-1 items-center justify-center"
            activeOpacity={0.8}
          >
            {isHome ? (
              <View className="items-center" style={{ marginTop: -10 }}>
                <View 
                  className="bg-[#930004] shadow-xl"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60 / 2,
                    borderWidth: 5,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="home" size={28} color="white" />
                </View>
              </View>
            ) : (
              <Ionicons 
                name={isActive ? (tab.icon as any) : `${tab.icon}-outline`} 
                size={24} 
                color="white" 
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}