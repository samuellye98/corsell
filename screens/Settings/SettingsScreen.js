import React from "react";
import {
  Alert,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteToken } from "../../services/token";

var firebase = require("firebase/app");

const tabs = [
  {
    icon: <AntDesign name="edit" size={30} color="#ffdd42" />,
    title: "Edit your profile",
    link: null
  },
  {
    icon: <AntDesign name="questioncircle" size={30} color="#000" />,
    title: "Terms & Conditions",
    link: null
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="shield"
        size={30}
        color="#fff"
        style={{ backgroundColor: "#2cae", borderRadius: 5 }}
      />
    ),
    title: "Privacy Policy",
    link: null
  },
  {
    icon: <AntDesign name="infocirlce" size={30} color="#2C85DE" />,
    title: "About Us",
    link: null
  }
];

const SettingsScreen = props => {
  const { navigate } = props.navigation;
  return (
    <ScrollView>
      {tabs.map(tab => (
        <TouchableOpacity
          style={styles.container}
          key={tab.title}
          onPress={tab.link}
        >
          <View style={styles.iconContainer}>
            {tab.icon}
            <Text style={styles.textContainer}>{tab.title}</Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color="black"
            style={styles.right}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
              {
                text: "No"
              },
              {
                text: "Yes",
                onPress: async () => {
                  await firebase.auth().signOut();
                  await deleteToken();
                  navigate("StartScreen");
                }
              }
            ],
            { cancelable: false }
          );
        }}
      >
        <View style={styles.iconContainer}>
          <AntDesign name="logout" size={30} color="red" />
          <Text style={styles.textContainer}>Logout</Text>
        </View>
        <AntDesign name="right" size={20} color="black" style={styles.right} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16
  },
  textContainer: { marginLeft: 16, fontFamily: "montserrat-regular" },
  right: {
    marginRight: 16
  }
});
