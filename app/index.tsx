import { Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import userDeliveryAuth from "../context/authContext";
import LoadingScreen from "../components/LoadingScreen";
import { useOrders } from "../context/orderContext";

export default function Index() {
  const { loading, deliveryBoyDetails, extractToken, getDeliveryBoyDetails } = userDeliveryAuth();
  const { currentOrder, fetchCurrentOrder } = useOrders();

 
  useEffect(() => {
    const init = async () => {
      const token = await extractToken();
      if (token) {
        await getDeliveryBoyDetails();
        await fetchCurrentOrder();
      } else {
        router.replace("/Login/login");
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (deliveryBoyDetails !== null && currentOrder !== undefined) {
      const isRegistered = deliveryBoyDetails?.isRegistered;
      
      if (!isRegistered) {
        router.replace("/Login/signup");
        return;
      }

      const status = currentOrder?.status || "none";
      console.log("this is from index",status)

      switch (status) {
        case "accepted":
          router.replace("/delivery/pickup");
          break;
        case "on the way":
          router.replace("/delivery/deliver");
          break;
        case "delivered":
          router.replace("/delivery/order");
          break;
        default:
          router.replace("/Tabs/home");
      }
    }
  }, [deliveryBoyDetails, currentOrder]);

  if (loading || !deliveryBoyDetails || currentOrder === null) {
    return <LoadingScreen />;
  }

  return null;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfa5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    top: 0,
    marginTop: -280,
    height: 500,
    width: '120%',
    borderBottomEndRadius: 100,
    borderBottomLeftRadius: 100
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 200
  },
  title: {
    fontSize: 24,
    color: '#00bfa5',
    marginTop: 10,
    fontWeight: 'bold',
    borderTopLeftRadius: 300,

  },
  tagline: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 100,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    color: '#00bfa5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  entryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  entryText: {
    color: '#00bfa5',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  loginText: {
    color: '#00bfa5',
    fontWeight: 'bold',
  },
})