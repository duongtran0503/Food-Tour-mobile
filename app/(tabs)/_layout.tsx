import CustomDrawerContent from "@/components/custom-sidebar";
import { Drawer } from "expo-router/drawer";
import React from "react";

export default function TabLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: { width: '75%' },
        swipeEnabled: true,
      }}
    >
     
      <Drawer.Screen
        name="(tabs-internal)" 
        options={{
          drawerLabel: "Trang chủ",
          title: "FoodVK",
        }}
      />
    </Drawer>
  );
}