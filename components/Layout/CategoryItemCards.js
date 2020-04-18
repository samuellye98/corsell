import React from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from "react-native";

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
    fontFamily: "montserrat-black"
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  cardImage: {
    borderRadius: 20,
    height: 100,
    width: 200,
    opacity: 0.5
  },
  cardText: {
    fontFamily: "montserrat-bold",
    position: "absolute",
    alignSelf: "center",
    marginTop: 40
  }
});

const categories = [
  [
    {
      title: "Education",
      image: require("../../assets/images/categories/education.jpg")
    },
    {
      title: "Electronics",
      image: require("../../assets/images/categories/electronics.jpeg")
    }
  ],
  [
    {
      title: "Housing",
      image: require("../../assets/images/categories/housing.jpg")
    },
    {
      title: "Services",
      image: require("../../assets/images/categories/services.jpg")
    }
  ]
];

export const CategoryItemCards = () => {
  const renderRow = item => (
    <View>
      <TouchableOpacity style={styles.card}>
        <Image style={styles.cardImage} source={item[0].image} />
        <Text style={styles.cardText}>{item[0].title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Image style={styles.cardImage} source={item[1].image} />
        <Text style={styles.cardText}>{item[1].title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categories}
        horizontal={true}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};
