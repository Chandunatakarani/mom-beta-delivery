import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const CommigSoon = () => {
  return (
    <View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.back();
        }}
      >
        <MaterialIcons name="arrow-back" size={26} color="#0d7377" />
      </TouchableOpacity>
      <View style={styles.txt}>
        <Text style={{ fontSize: 25, color: "#00a99d" }}>ComingSoon...</Text>
      </View>
    </View>
  );
};

export default CommigSoon;

const styles = StyleSheet.create({
  txt: {
    display: "flex",
    alignItems: "center",
    marginTop: 400,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});
