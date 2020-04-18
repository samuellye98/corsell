import React from "react";
import { ScrollView } from "react-native";
import { ProductHeader } from "../../components/Layout/Header";
import { ProductImage } from "./ProductImage";
import { ProductDetails } from "./ProductDetails";

const images = [
  { page: 1, img: require("../../assets/images/cornell1.jpg") },
  { page: 2, img: require("../../assets/images/cornell2.jpg") },
  { page: 3, img: require("../../assets/images/cornell3.jpg") },
  { page: 4, img: require("../../assets/images/cornell4.jpg") },
  { page: 5, img: require("../../assets/images/cornell5.jpg") }
];

export const ProductScreen = props => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ProductHeader navigation={props.navigation} />
      <ProductImage images={images} />
      <ProductDetails />
    </ScrollView>
  );
};
