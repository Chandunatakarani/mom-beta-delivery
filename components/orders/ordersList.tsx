import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import apiClient from "@/utils/apiClient";

const token = "your-token-here";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await apiClient("/api/allorders", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.orders || data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    setAcceptingOrderId(orderId);
    try {
      const res = await apiClient(
        `/api/orders/${orderId}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        
        throw new Error(errData.message || "Failed to accept order");
      }

      const data = await res.json();
      Alert.alert("Success", data.message || "Order accepted");
      router.push("/delivery/pickup"); 
      fetchOrders(); 
    } catch (err) {
      Alert.alert("Error", err.message);
    }
    setAcceptingOrderId(null);
  };


  const availableOrders = orders.filter(
    (order) => order.status === "confirmed" && !order.deliveryboy_id

  );
  const limitedOrders=availableOrders.slice(0,4);

  return (
    <ScrollView style={{ backgroundColor: "#D0E8E6" }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Available Orders</Text>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading && availableOrders.length === 0 && (
          <Text style={styles.noOrders}>No available orders at the moment.</Text>
        )}

        {limitedOrders.map((order) => (
          <View key={order._id} style={styles.orderCard}>
            <Text style={styles.orderId}>Order ID: {order._id}</Text>
            <Text style={styles.itemCount}>Items: {order.medicines.length}</Text>
            

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  acceptingOrderId === order._id && styles.buttonDisabled,
                ]}
                disabled={acceptingOrderId === order._id}
                onPress={() => acceptOrder(order._id)}
              >
                <Text style={styles.buttonText}>
                  {acceptingOrderId === order._id ? "Accepting..." : "ACCEPT"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => Alert.alert("Declined", "You declined the order")}
              >
                <Text style={styles.buttonText}>DECLINE</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  noOrders: {
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  itemCount: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    backgroundColor: "#008080",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonDisabled: {
    backgroundColor: "#00808088",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
