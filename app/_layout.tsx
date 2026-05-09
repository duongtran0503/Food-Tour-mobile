import "@/app/global.css";
import i18n from "@/lib/i18n";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router"; // Chuyển từ Drawer sang Stack
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

const queryClient = new QueryClient();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, 
});

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            
            {/* Sử dụng Stack để quản lý các folder con */}
            <Stack
              screenOptions={{
                headerShown: false, // Ẩn header mặc định để dùng header tự chế của mình
              
              }}
            >
              {/* Màn hình Splash/Index */}
              <Stack.Screen name="index" />

              {/* Nhóm Tabs (Home, Search, v.v.) */}
              <Stack.Screen name="(tabs)" />

              {/* Trang chi tiết Tour */}
              <Stack.Screen name="tour/detail/[id]" />
              
              {/* Trang chi tiết Nhà hàng */}
              <Stack.Screen name="restaurant/detail/[id]" />

              {/* Trang chi tiết Món ăn */}
              <Stack.Screen name="food/detail/[id]" />

              {/* Trang Bản đồ Tour */}
              <Stack.Screen name="tour/map/[id]" />

              {/* Trang chia sẻ Tour */}
              <Stack.Screen name="tour/share/[id]" />

              {/* Trang danh sách tất cả nhà hàng */}
              <Stack.Screen name="restaurant/all" />

              {/* Nhóm Đăng nhập / Đăng ký */}
              <Stack.Screen name="(auth)" />

              {/* Trang hướng dẫn (nếu có) */}
              <Stack.Screen name="onboarding" />
              
            </Stack>

          </GestureHandlerRootView>
        </GluestackUIProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}