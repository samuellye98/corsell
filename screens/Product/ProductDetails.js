import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Rating } from "react-native-elements";
import metrics from "../../config/metrics";

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  profileImg: { width: 60, height: 60, borderRadius: 60 },
  column: { marginLeft: 10 },
  title: { fontFamily: "montserrat-bold", fontSize: 20 },
  username: { fontFamily: "montserrat-light", fontSize: 12 },
  price: {
    fontFamily: "montserrat-regular",
    fontSize: 16,
    marginLeft: "auto",
    marginRight: 10
  },
  textRow: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: "space-between"
  },
  label: { fontFamily: "montserrat-regular" },
  labelInfo: {
    fontFamily: "montserrat-light"
  },
  description: {
    marginHorizontal: 10,
    marginTop: 10,
    fontFamily: "montserrat-light"
  },
  chatButton: {
    marginVertical: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: metrics.DEVICE_WIDTH / 2,
    backgroundColor: "#2C85DE",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  chatButtonText: { fontFamily: "montserrat-bold", color: "#fff" }
});

export const ProductDetails = () => {
  return (
    <>
      <View style={styles.row}>
        <Image
          source={require("../../assets/images/profile.jpg")}
          style={styles.profileImg}
        />
        <View style={styles.column}>
          <Text style={styles.title}>Item Title</Text>
          <Text style={styles.username}>@Seller-Username</Text>
        </View>
        <Text style={styles.price}>$PRICE</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Condition:</Text>
        <Text style={styles.labelInfo}>New</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Deal Method:</Text>
        <Text style={styles.labelInfo}>Meetup</Text>
      </View>
      <View style={styles.textRow}>
        <Text style={styles.label}>Rating:</Text>
        <Rating imageSize={10} startingValue={5} />
      </View>
      <Text style={styles.description}>
        Description here
        lalalalalallalalalalalalalalalalalalallalalalalaalalalalallalalalalalalalalalalalalallalalalalaalalalalallalalalalalalalalalalalalallalalalalaalalalalallalalalalalalalalalalalalallalalalalaalalalalallalalalalalalalalalalalalallalalalala
      </Text>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>Chat with seller</Text>
      </TouchableOpacity>
    </>
  );
};
