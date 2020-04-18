import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import UploadButton from "../components/UploadButton";
import { CategoryItemCards } from "../components/Layout/CategoryItemCards";
import { ItemCards } from "../components/Layout/ItemCards";

const HomeScreen = props => {
  const { navigate } = props.navigation;
  return (
    <>
      <ScrollView style={styles.container}>
        <CategoryItemCards />
        <Text style={styles.header}>Your Daily Picks</Text>
        <ItemCards navigate={navigate} />
      </ScrollView>
      <UploadButton onPress={() => navigate("UploadImage")} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "montserrat-black"
  }
});
