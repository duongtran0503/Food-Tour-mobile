// app/(tabs)/_layout.tsx
import CustomTabBar from "@/components/custom-tabbar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabNavigation() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Ẩn Header hệ thống để bạn tự vẽ bằng Tailwind
        tabBarActiveTintColor: "#930004", // Màu đỏ Primary của FoodVK khi được chọn
        tabBarInactiveTintColor: "#64748b", // Màu xám khi không được chọn
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
      }}
      tabBar={(props) => <CustomTabBar />} // Sử dụng CustomTabBar thay vì tabBar mặc định
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
}