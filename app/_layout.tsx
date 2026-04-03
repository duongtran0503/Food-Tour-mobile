import "@/app/global.css";
import CustomDrawerContent from "@/components/custom-sidebar";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
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
            name="index"
            options={{ drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="(tabs)" 
            options={{
              drawerLabel: 'Home',
              title: 'FoodVK',
              
            }}
          />
          <Drawer.Screen
           name="tour/detail/[id]"

            options={{  drawerItemStyle: { display: 'none' },swipeEnabled: false, }}
            
          />
            <Drawer.Screen
           name="restaurant/detail/[id]"

            options={{  }}
          />

            <Drawer.Screen
            name="food/detail/[id]"
            options={{  }}
          />
            <Drawer.Screen
         name="tour/map/[id]"
              options={{  }}
          />

            <Drawer.Screen
           name="restaurant/all"

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
        
        </Drawer>
      </GestureHandlerRootView>
    </GluestackUIProvider>
    </QueryClientProvider>
  );
}
   
