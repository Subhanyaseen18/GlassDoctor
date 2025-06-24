import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import Login from '../Screens/Auth/Login';
import ForgotScreen from '../Screens/Auth/ForgotPassword';
const Stack = createStackNavigator();
export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
