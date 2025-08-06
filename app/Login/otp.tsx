import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import userDeliveryAuth, { DeliveryBoyAuthContext } from "../../context/authContext";
import { log } from "console";

const slides = [
  require("../../assets/images/1image.png"),
  require("../../assets/images/2image.png"),
  require("../../assets/images/3image.png"),
];
export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
   const[canResend,setCanResend]=useState(false)
  const [timer, setTimer] = useState(30);
  const { verifyOtp } = userDeliveryAuth();
  const params = useLocalSearchParams();
  const user = params.deliveryBoy as string;

  const{ resendOtp }= userDeliveryAuth()                               

 useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(autoScroll);
  }, [currentIndex]);
  
    const newUser = async() =>{

    }
        
  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    const success = await verifyOtp(code, user);
    if (success) {
      router.replace("/");
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {  
    await resendOtp(user)
    console.log("we are resending the otp");
    if (canResend) {
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setCanResend(false);
      try {
        Alert.alert("OTP Resent", "A new OTP has been sent to your phone");
      } catch (error) {
        Alert.alert("Error", "Failed to resend OTP. Please try again.");
        setCanResend(true);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              data={slides}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(
                  e.nativeEvent.contentOffset.x /
                    e.nativeEvent.layoutMeasurement.width
                );
                setCurrentIndex(index);
              }}
              renderItem={({ item }) => (
                <Image source={item} style={styles.logo} />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index ? styles.activeDot : null,
                  ]}
                />
              ))}
            </View>

            <View style={styles.bottomCard}>
              <Text style={styles.heading}>Almost there!</Text>
              <Text style={styles.subtext}>Enter the secret code</Text>
             <Text style={styles.subtext} onPress={()=>{router.push('/Login/login')}}>Edit Number</Text>
              <Text style={styles.otpSent}>OTP sent via SMS to {user}</Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={styles.otpBox}
                    keyboardType="numeric"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    autoFocus={index === 0}
                  />
                ))}
              </View>

                 {/* Resend Otp */}
              <View style={styles.resendRow}>
                <Text style={styles.resendText}>
                  {canResend ? "" : `Wait for ${timer}s to `}
                </Text>
                <TouchableOpacity
                  onPress={handleResendOtp}
                  disabled={!canResend}
                >
                  <Text
                    style={[styles.resendText, !canResend && { opacity: 0.5 }]}
                  >
                    Resend the OTP
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleSubmit} style={styles.verifyButton}>
                <Text style={styles.verifyButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 90,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  logo: {
    width: 370,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
    bottom: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007E71",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtext: {
    fontSize: 22,
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    bottom: 9,
  },
  otpSent: {
    fontSize: 13,
    color: "#777",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 20,
  },
  otpBox: {
    width: 40,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#d5ece9",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: "#007E71",
    paddingVertical: 15,
    width: 350,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  verifyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "center",
  },
  bottomCard: {
    backgroundColor: "#E5F2F1",
    borderTopLeftRadius: 140,
    borderTopRightRadius: 140,
    paddingTop: 40,
    paddingHorizontal: 70,
    paddingBottom: 20,
    flex: 1,
    justifyContent: "flex-start",
    bottom: -25,
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 4,
    flexWrap: "wrap",
  },
  resendText: {
    fontSize: 14,
    color: "#007AFF",
  }
});