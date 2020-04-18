import React from "react";
import { StyleSheet, Image, View } from "react-native";
import Swiper from "react-native-swiper";
import metrics from "../../config/metrics";

const styles = StyleSheet.create({
  pagination: {
    height: 20,
    backgroundColor: "transparent",
    position: "absolute",
    top: metrics.DEVICE_WIDTH - 20,
    zIndex: 99
  },
  image: {
    height: metrics.DEVICE_WIDTH,
    width: metrics.DEVICE_WIDTH
  }
});

export const ProductImage = ({ images }) => {
  return (
    <View style={styles.image}>
      <Swiper showsPagination={true} paginationStyle={styles.pagination}>
        {images.map(o => (
          <Image key={o.page} style={styles.image} source={o.img} />
        ))}
      </Swiper>
    </View>
  );
};
