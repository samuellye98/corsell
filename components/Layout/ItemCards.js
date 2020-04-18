import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Rating } from 'react-native-elements';
import metrics from '../../config/metrics';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 20,
  },
  card: {
    height: metrics.CARD_WIDTH + 100,
    width: metrics.CARD_WIDTH,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
  },
  cardImage: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: metrics.CARD_WIDTH,
    width: metrics.CARD_WIDTH,
  },
  title: { fontFamily: 'montserrat-bold', marginLeft: 5 },
  price: { fontFamily: 'montserrat-regular', fontSize: 12, marginLeft: 5 },
  rating: { marginLeft: 5 },
  category: {
    borderRadius: 30,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: '#FFA500',
    padding: 5,
    width: 50,
  },
  categoryText: { color: '#fff', fontSize: 10 },
});

export const ItemCards = (props) => {
  const { navigate } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate('ProductScreen')}
      >
        <Image
          style={styles.cardImage}
          source={require('../../assets/images/cornell1.jpg')}
        />
        <Text style={styles.title}>TITLE OF ITEM</Text>
        <Text style={styles.price}>$XXXX.00</Text>
        <Rating imageSize={10} startingValue={5} style={styles.rating} />
        <View style={styles.category}>
          <Text style={styles.categoryText}>Category</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate('ProductScreen')}
      >
        <Image
          style={styles.cardImage}
          source={require('../../assets/images/cornell2.jpg')}
        />
        <Text style={styles.title}>TITLE OF ITEM</Text>
        <Text style={styles.price}>$XXXX.00</Text>
        <Rating imageSize={10} startingValue={3.3} style={styles.rating} />
        <View style={styles.category}>
          <Text style={styles.categoryText}>Category</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
