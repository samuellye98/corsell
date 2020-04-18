import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { getToken } from '../../services/token';
import metrics from '../../config/metrics';

const imageSource = require('../../assets/images/logo.png');
var firebase = require('firebase/app');

export const SplashScreen = (props) => {
  const loginUser = async () => {
    const result = await getToken();
    const email = result[0][1];
    const password = result[1][1];

    if (email && password) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    }

    if (firebase.auth().currentUser) {
      props.navigation.navigate('MainTabNavigator');
    } else {
      props.navigation.navigate('StartScreen');
    }
  };

  useEffect(() => {
    loginUser();
  });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={imageSource}
        style={{ resizeMode: 'center', width: metrics.DEVICE_WIDTH }}
      />
    </View>
  );
};
