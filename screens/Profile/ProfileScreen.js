import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import metrics from "../../config/metrics";
import { ItemCards } from "../../components/Layout/ItemCards";

const ProfileScreen = props => {
  const { navigate } = props.navigation;
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>Justiana Bieber</Text>
        <Text style={styles.profileUsername}>@justinbieber</Text>
      </View>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/profile.jpg")}
        />
      </View>
      <View>
        <Text style={{ fontFamily: "montserrat-bold", textAlign: "center" }}>
          Listings
        </Text>
      </View>
      <ItemCards navigate={navigate} />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#f5f5f5",
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_WIDTH / 2,
    borderBottomRightRadius: metrics.DEVICE_WIDTH / 2,
    borderBottomLeftRadius: metrics.DEVICE_WIDTH / 2,
    alignItems: "center"
  },
  profileName: {
    marginTop: 20,
    color: "#2C85DE",
    fontSize: 20,
    fontFamily: "montserrat-black"
  },
  profileUsername: {
    fontSize: 12,
    fontFamily: "montserrat-regular"
  },

  profilePicContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    justifyContent: "center",
    bottom: 75,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    alignSelf: "center"
  }
});
