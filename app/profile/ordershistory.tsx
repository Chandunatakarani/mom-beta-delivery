import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import userDeliveryAuth from "../../context/authContext";
import apiClient from "../../utils/apiClient";

export default function OrderHistoryScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { extractToken } = userDeliveryAuth();

  const fetchOrders = async () => {
    try {
      const token = await extractToken();
      console.log("Extracted Token:", token);

      if (!token) {
        console.error("No token found.");
        Alert.alert("Authentication Error", "Login token is missing.");
        setLoading(false);
        return;
      }
      console.log("ths is from orderhistory");

      const response = await apiClient("api/getOrderHistory", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Fetched response", response);
      if (response) {
        const grouped = response.orders?.reduce((acc, order) => {
          const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          });

          const orderItem = {
            Time: new Date(order.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            order_id: order._id,
            RTS: order.status === "delivered" ? "delivered" : "On-time RTS",
          };

          const section = acc.find((section) => section.title === date);
          if (section) {
            section.data.push(orderItem);
          } else {
            acc.push({ title: date, data: [orderItem] });
          }

          return acc;
        }, []);

        setData(grouped);
      }
    } catch (error) {
      console.error("Network or fetch error:", error.message);
      Alert.alert("Network Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: "white",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <MaterialIcons
          name="arrow-back"
          size={25}
          color="#fff"
          style={styles.MaterialIcons}
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontSize: 20,
            color: "#00a99d",
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          Order History
        </Text>
      </View>

      <SectionList
        sections={data}
        keyExtractor={(item) => item.order_id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.timeBox}>
            <View style={styles.btn}>
              <View style={styles.dataContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <Ionicons name="time" size={26} style={styles.timeicon} />

                  <Text style={styles.time}>{item.Time}</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={23}
                    style={styles.icon}
                  />
                </View>

                <Text style={styles.orderDetails}>Order: {item.order_id}</Text>
                <View style={styles.CODcontainer}>
                  <Text style={styles.COD}>COD</Text>
                  <Text style={styles.statusBadge}>{item.RTS}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "./orderDetails",
                    params: {
                      orderId: item.order_id,
                      createdAt: item.Time,
                      status: item.RTS,
                    },
                  })
                }
              ></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  MaterialIcons: {
    marginVertical: 0,
    color: "#00a99d",
    marginTop: 10,
    marginBottom: 10,
  },

  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: "700",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    color: "#676767",
    marginLeft: 5,
  },
  dataContainer: {
    paddingLeft: 8,
  },
  timeBox: {
    marginVertical: 10,
    // backgroundColor: "#7bc8c2c9",
    backgroundColor: "#6bcec686",
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#00a99d",
    marginHorizontal: 10,
  },
  time: {
    fontSize: 14,
    color: "black",
    fontWeight: "600",
    marginTop: 10,
  },
  statusBadge: {
    marginLeft: 150,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 8,
    fontSize: 13,
    color: "#00a99d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    textAlign: "center",
  },
  orderDetails: {
    fontWeight: "400",
    fontSize: 14,
    color: "#676767",
    marginTop: 8,
  },
  CODcontainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  COD: {
    fontWeight: "700",
    width: 55,
    height: 35,
    // backgroundColor: "#8C8D8D33",
    backgroundColor: "#00a99d",
    borderRadius: 10,
    textAlign: "center",
    // textAlignVertical: "center",
    fontSize: 12,
    padding: 10,
    color: "#fff",
  },
  icon: {
    color: "#00a99d",
    marginBottom: 30,
    marginTop: 5,
    marginLeft: 172,
  },
  timeicon: {
    marginTop: 8,
    color: "#069087ff",
    marginRight: 6,
  },
});