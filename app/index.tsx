// app/index.tsx
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {

  const isLoading = false; 
  const isLoggedIn = false; 
  const hasSeenOnboarding = true; 

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#930004" /> 
      </View>
    );
  }

  if (!hasSeenOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}