import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HousingScreen from '../screens/HousingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import UploadImage from '../screens/Upload/UploadImage';
import UploadCategory from '../screens/Upload/UploadCategory';
import UploadDetails from '../screens/Upload/UploadDetails';
import {
  UploadDetailsHeader,
  UploadCategoryHeader,
} from '../components/UploadHeader';
import { SearchResults } from '../screens/Search/SearchResults';
import { ProductScreen } from '../screens/Product/ProductScreen';
import { MainHeader, SideHeader } from '../components/Layout/Header';
import { Entypo, AntDesign, Foundation, FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Shop"
      tabBarOptions={{
        inactiveBackgroundColor: '#fefefe',
        activeBackgroundColor: '#fefefe',
        style: { paddingHorizontal: 10 },
        style: {
          height: 65,
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
        },
        labelPosition: 'below-icon',
        adaptive: true,
      }}
    >
      <Tab.Screen
        name="Shop"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  color: '#DAA520',
                  marginTop: 10,
                }}
              >
                Shop
              </Text>
            ) : null,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="shop"
              size={26}
              color={focused ? '#DAA520' : '#DCDCDC'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Housing"
        component={HousingScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  color: '#4BE2C2',
                  marginTop: 10,
                }}
              >
                Housing
              </Text>
            ) : null,
          tabBarIcon: ({ focused }) => (
            <Foundation
              name="map"
              size={26}
              color={focused ? '#4BE2C2' : '#DCDCDC'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={NotificationScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  color: '#DD514E',
                  marginTop: 10,
                }}
              >
                Activity
              </Text>
            ) : null,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="notification"
              size={26}
              color={focused ? '#DD514E' : '#DCDCDC'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  color: '#2C85DE',
                  marginTop: 10,
                }}
              >
                Profile
              </Text>
            ) : null,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user-o"
              size={26}
              color={focused ? '#2C85DE' : '#DCDCDC'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainScreen" headerMode="screen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          header: ({ navigation, routes }) => (
            <MainHeader navigation={navigation} routes={routes} />
          ),
        }}
      />
      <Stack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="UploadCategory"
        component={UploadCategory}
        options={{
          header: ({ navigation }) => (
            <UploadCategoryHeader navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="UploadDetails"
        component={UploadDetails}
        options={{
          header: ({ navigation }) => (
            <UploadDetailsHeader navigation={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          header: ({ navigation }) => (
            <SideHeader screenProps={{ navigation: navigation }} />
          ),
        }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          header: ({ navigation }) => (
            <SideHeader screenProps={{ navigation: navigation }} />
          ),
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}

export default MainTabNavigator;
