import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../screens/Authentication/StartScreen';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
