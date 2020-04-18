import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';

export const MainHeader = (props) => {
  const routes = useNavigationState((state) => state.routes);
  const { navigate } = props.navigation;
  var bottomTabRouteName = 'Shop';
  if (routes[0].state) {
    const index = routes[0].state.index;
    bottomTabRouteName = routes[0].state.routeNames[index];
  }
  return (
    <View style={styles.header}>
      {bottomTabRouteName == 'Profile' ? (
        <TouchableOpacity style={styles.settingsIcon}>
          <AntDesign
            name="setting"
            size={30}
            onPress={() => navigate('SettingsScreen')}
          />
        </TouchableOpacity>
      ) : null}
      <Text style={styles.headerName}>{bottomTabRouteName}</Text>
      <TouchableOpacity style={styles.searchIcon}>
        <Feather
          name="search"
          size={30}
          onPress={() => navigate('SearchResults')}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.chatIcon}>
        <Feather name="message-circle" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export class SideHeader extends Component {
  render() {
    let routeName;
    try {
      routeName = this.props.screenProps.navigation.state.routes[1].routeName;
    } catch (e) {}
    const { navigate, goBack } = this.props.screenProps.navigation;
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsIcon}>
          <AntDesign name="left" size={30} onPress={() => goBack(null)} />
        </TouchableOpacity>
        <Text style={styles.headerName}>{routeName}</Text>
        {routeName === 'Results' ? (
          <TouchableOpacity style={styles.searchIcon}>
            <Feather
              name="search"
              size={30}
              onPress={() => navigate('SearchResults')}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

export const ProductHeader = ({ navigation }) => {
  const { navigate, goBack } = navigation;
  return (
    <View style={styles.productHeader}>
      <AntDesign
        name="left"
        size={30}
        style={styles.settingsIcon}
        onPress={() => goBack(null)}
      />
      <Feather
        name="search"
        size={30}
        style={styles.searchIcon}
        onPress={() => navigate('Results')}
      />
      <Feather name="message-circle" size={30} style={styles.chatIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  headerName: {
    position: 'absolute',
    bottom: 10,
    fontFamily: 'montserrat-black',
  },
  searchIcon: {
    position: 'absolute',
    right: 60,
    bottom: 5,
  },
  chatIcon: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    transform: [{ rotateZ: '-90deg' }],
  },
  settingsIcon: {
    position: 'absolute',
    left: 15,
    bottom: 5,
  },
  productHeader: {
    height: 70,
    width: '100%',
    position: 'absolute',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
