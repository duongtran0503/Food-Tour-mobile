import "@/app/global.css";
import CustomDrawerContent from "@/components/custom-sidebar";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerPosition: 'right',
            drawerStyle: { width: '75%' },
          }}
        >
          <Drawer.Screen
            name="(tabs)" 
            options={{
              drawerLabel: 'Home',
              title: 'FoodVK',
            }}
          />
          <Drawer.Screen
           name="tour/[id]"

            options={{  drawerItemStyle: { display: 'none' },swipeEnabled: false, }}
          />
            <Drawer.Screen
           name="restaurant/[id]"

            options={{  drawerItemStyle: { display: 'none' },swipeEnabled: false, }}
          />


          <Drawer.Screen
            name="(auth)"
            options={{ drawerItemStyle: { display: 'none' } }} 
          />
          <Drawer.Screen
            name="onboarding"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="index"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}