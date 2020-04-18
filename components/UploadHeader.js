import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const UploadCategoryHeader = (props) => {
  const { goBack } = props.navigation;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon} onPress={() => goBack()}>
        <AntDesign name="left" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerTextContainer} marginBottom={5}>
        <Text style={styles.headerMainText}>Choose a category</Text>
      </View>
    </View>
  );
};

export const UploadDetailsHeader = (props) => {
  const { goBack } = props.navigation;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerIcon} onPress={() => goBack()}>
        <AntDesign name="left" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerMainText}>Complete your listing</Text>
        <Text style={styles.headerSideText}>
          Highlighted fields are required
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C85DE',
  },
  headerIcon: {
    marginTop: 30,
    position: 'absolute',
    left: 8,
    bottom: 12,
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  headerMainText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'montserrat-regular',
  },
  headerSideText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'montserrat-light',
  },
});
