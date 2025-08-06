import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DeliveryBoyAuthProvider } from "../../context/authContext";
import { COLORS } from "../../constants/COLORS";
export default function _layout() {
  return (
    <DeliveryBoyAuthProvider>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: COLORS.primary,
          tabBarActiveTintColor: COLORS.primary,
          tabBarLabelStyle: { fontSize: 12 },
          headerShown: true,
          tabBarStyle: {
            backgroundColor: COLORS.secondary,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
          },
          tabBarIconStyle: { marginBottom: 5 },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="home-plus"
                size={24}
                color={COLORS.primary}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="earnings"
          options={{
            title: "Earning",
            tabBarIcon: () => (
              <Ionicons name="bag-add" size={24} color={COLORS.primary} />
            ),
          }}
        />
        {/* <Tabs.Screen name="settings" options={{ title: 'Settings' }} /> */}
        <Tabs.Screen
          name="WorkShifts"
          options={{
            title: "Work Shifts",
            tabBarIcon: () => (
              <AntDesign name="clockcircle" size={24} color={COLORS.primary} />
            ),
          }}
        />
        <Tabs.Screen
          name="Orders"
          options={{
            title: "Orders",
            tabBarIcon: () => (
              <AntDesign name="table" size={24} color={COLORS.primary} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: () => (
              <AntDesign name="profile" size={24} color={COLORS.primary} />
            ),
          }}
        />
      </Tabs>
    </DeliveryBoyAuthProvider>
  );
}
