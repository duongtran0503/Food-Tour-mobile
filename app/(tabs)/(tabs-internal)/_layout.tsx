import CustomTabBar from "@/components/custom-tabbar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabInternalLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        
      }}
     tabBar={(props)=><CustomTabBar/>}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}