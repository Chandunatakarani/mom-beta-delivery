import React from "react";
import { Stack } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/COLORS";

import { DeliveryBoyAuthProvider } from "../context/authContext";
import { LocationProvider } from "../context/locatonContext";
import { OrderProvider } from "../context/orderContext";
import { StatusProvider } from "../context/deliveryBoyStatusContext";

export default function RootLayout() {
  return (
    <DeliveryBoyAuthProvider>
      <LocationProvider>
        <StatusProvider>
          <OrderProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: COLORS.secondary,
                },
              }}
            />
          </OrderProvider>
        </StatusProvider>
      </LocationProvider>
    </DeliveryBoyAuthProvider>
  );
}
