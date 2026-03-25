
import "@/app/global.css";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />

        <Stack.Screen name="onboarding" />

        <Stack.Screen name="(tabs)" />

      </Stack>

    </GluestackUIProvider>
  );
}