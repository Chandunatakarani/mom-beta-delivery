import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  // SafeAreaView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import apiClient from "../../utils/apiClient";
import userDeliveryAuth from "../../context/authContext";
// import { useLocation } from "@/context/locatonContext";
import { useEarnings } from "../../Hooks/earningHooks";
import { useOnlineStatus } from "../../context/deliveryBoyStatusContext";
import BannerCarousel from "../../components/banner";
import FooterComponent from "../../components/footer";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/COLORS";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  // const [isOnline, setIsOnline] = useState(false);
  const { isOnline, setIsOnline } = useOnlineStatus();

  const [modalVisible, setModalVisible] = useState(false);
  const [earning, setEarning] = useState(0);
  const navigation = useNavigation();
  const { regId } = useLocalSearchParams();
  const { extractToken } = userDeliveryAuth();
  const toggleSwitch = async () => {
    const newState = !isOnline;
    setIsOnline(newState);
    await updateOnlineStatus(newState ? "Online" : "Offline");
  };
  useEffect(() => {
    const fetchOnlineStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem("onlineStatus");
        if (storedStatus) {
          setIsOnline(storedStatus === "Online"); // true if 'Online'
        }
      } catch (error) {
        console.error("Failed to load online status:", error);
      }
    };

    fetchOnlineStatus();
  }, []);

  const { deliveryBoyDetails } = userDeliveryAuth();

  const updateOnlineStatus = async (status) => {
    const token = await extractToken();
    try {
      const response = await apiClient(`delivery/loginhours`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response) {
        throw new Error("Failed to update status");
      }
      await AsyncStorage.setItem("onlineStatus", status);
      console.log("Status updated to:", status);
    } catch (error) {
      console.error("status update error", error.message);
    }
  };

  // const { locationName, refreshLocation, latitude, longitude } = useLocation();

  const { getEarnings } = useEarnings();

  const getCurrentHour = new Date().getHours();
  let greet;
  if (getCurrentHour >= 5 && getCurrentHour < 12) {
    greet = "Good Morning,";
  } else if (getCurrentHour >= 12 && getCurrentHour < 18) {
    greet = "Good Afternoon,";
  } else {
    greet = "Good Evening,";
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.primary}}>
      <View style={styles.topnavbar}>
        <Text style={styles.txt}>medicine on minutes</Text>
        <View style={styles.headerSection}>
          <View style={styles.leftSection}>
            {/* <TouchableOpacity onPress={refreshLocation}>
              <View style={styles.row}>
                <Image
                  source={require("../../assets/images/location.png")}
                  style={styles.locationIcon}
                />
                <Text
                  style={styles.locationText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {locationName || "Fetching Location..."}
                </Text>
                {
                  <Text
                    style={{
                      fontSize: 12,
                      color: "gray",
                      flexDirection: "column",
                    }}
                  >
                    {latitude && longitude
                      ? `${latitude}, ${longitude}`
                      : "Loading..."}
                  </Text>
                }
                <Entypo
                  style={{ marginTop: 2, marginLeft: 5 }}
                  name="chevron-down"
                  size={20}
                  color="white"
                />
              </View>
            </TouchableOpacity> */}
          </View>

          {/* <TouchableOpacity style={styles.helpButton}>
            <FontAwes6 name="user-large" size={24} color="black" onPress={() => router.push('./profile/profile')} />
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.helpButton}
            onPress={() => router.push("/profile/momhelp")}
          >
            <Text style={{ color: "black" }}>help</Text>
            <Image
              source={require("../../assets/images/helpsupport.svg")}
              style={styles.helpIcon}
            />
          </TouchableOpacity> */}
        </View>
      </View>

      <ScrollView>
        <View style={{ backgroundColor: COLORS.primary, padding: 15, height:"auto" ,  display:"flex", flexDirection:"row", justifyContent:"space-between" , alignItems:"center" }}>
          <View style={{zIndex:10 ,width:"50%",}}>
            <Text style={styles.greetText}>
            {greet + " "}
            {deliveryBoyDetails ? deliveryBoyDetails.name : " "}
          </Text>
          <View style={styles.personal}>
            <Text style={styles.personalText}>
              Stay safe on the road,and
            </Text>
            <Text style={styles.personalText}>
               have a great day!
            </Text>
            <View style={styles.statItemBanner}>
              <Text style={styles.statLabelBanner}>your earnings</Text>
                    <Text style={styles.statValueBanner}>
                      ₹ {getEarnings ? getEarnings.total_earning : 0}
                    </Text>
                    
                  </View>
          </View>
          </View>
          <View>
            <Image
                  source={require("../../assets/images/Home/scooty.png")}
                  style={{ zIndex:1}}
                />
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 15 , backgroundColor:COLORS.secondary}}>
          <View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 , marginBottom:"5%"}}>
              <Text style={{ color: "blacck", fontSize: 16 }}>status:</Text>
              <Text
                style={[
                  styles.statusText,
                  { color: isOnline ? "#00A99D" : "gray", fontSize: 18 },
                ]}
              >
                {isOnline ? "Online" : "Offline"}
              </Text>
            </View>
            <Text style={styles.onlineInfoText}>
              Go online on time and earn bonuses!
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#00A99D" }}
              thumbColor="white"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isOnline}
              style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.3 }]  }}
            />
          </View>
        </View>

        <View style={{backgroundColor:COLORS.secondary}}>
          <BannerCarousel />
        </View>

        <View style={{backgroundColor:COLORS.secondary}}>
          <View style={{ margin: "2%" }}>
          <LinearGradient
            colors={["#00a99d", "#00dccc"]}
            locations={[0.4254, 0.9896]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ borderRadius: 15 }}
          >
            <View style={styles.sectionTitle}>
              <Text style={styles.sectionTitleText}>My Progress</Text>

              <View style={{ margin: 15 }}>
                <View style={styles.horizontalDivider} />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      ₹ {getEarnings ? getEarnings.total_earning : 0}
                    </Text>
                    <Text style={styles.statLabel}>Earnings</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {deliveryBoyDetails?.totalOnlineTimeInMs
                        ? (() => {
                          const totalMinutes = Math.floor(
                            deliveryBoyDetails.totalOnlineTimeInMs / 60000
                          );
                          const hours = Math.floor(totalMinutes / 60);
                          const minutes = totalMinutes % 60;
                          return `${hours}:${minutes
                            .toString()
                            .padStart(2, "0")}`;
                        })()
                        : "0:00"}
                    </Text>
                    <Text style={styles.statLabel}>Login Time</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {getEarnings ? getEarnings.orders.length : 0}
                    </Text>
                    <Text style={styles.statLabel}>Orders</Text>
                  </View>
                </View>

                <Text style={{ color: "white", paddingTop: 25, fontSize: 15 }}>
                  Traffic advisor for your route.
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        </View>

        <View style={{backgroundColor:COLORS.secondary}}>
          <FooterComponent />
          </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      ></Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topnavbar: {
    height: height * 0.10,
    width: width,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  txt: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    // textAlign: "center",
    flex: 1,
    paddingVertical: 10,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: '4%',
    // paddingHorizontal: "3%",
    marginBottom: 2,
  },
  leftSection: {
    flex: 1,
    marginRight: 10,
  },
  statItemBanner: {
    flex: 1,
    marginTop:20,
    // alignItems: "center",
  },
  statValueBanner: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  statLabelBanner: {
    fontSize: 18,
    // textAlign: "center",
    color: "white",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  statLabel: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  divider: {
    width: 1,
    backgroundColor: "white",
    height: "120%",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "white",
    marginBottom: 15,
    marginTop: 5,
  },

  filterButton: {
    height: 35,
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#00a99d",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  filterButtonText: {
    color: "#00a99d",
    fontSize: 14,
  },

  row: {
    flexDirection: "row",
    // alignItems: "center",
    alignItems:"flex-start"
  },
  locationText: {
    color: "white",
    fontSize: 18,
    // marginLeft: 10,
    textAlign: "left",
    maxWidth: 180,
    marginBottom:"10%"
  },
  helpButton: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",

  },

  // topSection: {
  //   backgroundColor: "#fff",
  //   padding: "4%",
  //   marginBottom: "5%",
  //   // borderBottomLeftRadius: 20,
  //   // borderBottomRightRadius: 20
  //   margin: 15,
  //   borderRadius: 20,
  // },
  greetText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "white",
    marginBottom: "4%",
  },

  personal: {
    marginTop: 13,
  },
  personalText: {
    fontSize: 16,
    color: "white",
    top: -15,
  },
  onlineSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },
  onlineInfoText: {
    flex: 1,
    fontSize: 14,
    color: "Black",
    fontWeight: "600",
    marginRight: 10,
    top: -10,
  },
  statusSwitch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    top: -10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  ShiftCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: "1%",
    margin: "2%",
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "#e5f2f1",
  },
  calendarImage: {
    width: 45,
    height: 45,
  },
  shiftTitle: {
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
  },
  shiftTime: {
    fontSize: 16,
    color: "white",
    marginTop: 4,
  },
  shiftButton: {
    color: "white",
    fontWeight: "bold",
    marginTop: 5,
  },

  sectionTitle: {
    borderRadius: 15,
    margin: "5%",
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  earningsOrdersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  earningsCard: {
    backgroundColor: "#00A99D",
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  ordersCard: {
    backgroundColor: "#00A99D",
    padding: 20,
    borderRadius: 12,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  earningsTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
  },
  earningsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  loginHoursCard: {
    backgroundColor: "#00A99D",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  loginValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  loginCaption: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#00A99D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#767577",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  // helpIcon: {
  //   width: 35,
  //   height: 35,
  //   color: "white",
  //   backgroundColor: "black",
  // },
});
