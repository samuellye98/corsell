import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import metrics from "../config/metrics";
import { MaterialIcons } from "@expo/vector-icons";

export default function UploadButton(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
        <MaterialIcons name="add-circle" style={styles.icon} size={20} />
        <Text style={styles.text}>SELL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 999,
    bottom: 10,
    width: metrics.DEVICE_WIDTH,
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    backgroundColor: "#2C85DE",
    height: 45,
    width: 105,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: { color: "#fff", marginRight: 5 },
  text: {
    color: "#fff",
    fontFamily: "montserrat-regular"
  }
});
