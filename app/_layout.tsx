import "@/app/global.css";
import i18n from "@/lib/i18n";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { useEffect } from "react"; // THÊM IMPORT
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { io } from "socket.io-client"; // THÊM IMPORT

const queryClient = new QueryClient();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {

  // TỰ ĐỘNG KẾT NỐI SOCKET KHI MỞ APP
  useEffect(() => {
    // FIX: Tách riêng URL Socket, KHÔNG ĐƯỢC có /api/v1 ở cuối
    // Bạn nên kiểm tra file .env xem EXPO_PUBLIC_API_URL có bị dư /api/v1 không
    const socketUrl = 'http://192.168.31.9:8080';

    const socket = io(socketUrl, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('App đã kết nối Socket ID:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.log('Lỗi kết nối Socket Mobile:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="tour/detail/[id]" />
              <Stack.Screen name="restaurant/detail/[id]" />
              <Stack.Screen name="food/detail/[id]" />
              <Stack.Screen name="tour/map/[id]" />
              <Stack.Screen name="tour/share/[id]" />
              <Stack.Screen name="restaurant/all" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="onboarding" />
            </Stack>
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}