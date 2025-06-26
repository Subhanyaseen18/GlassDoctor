import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import Login from '../Screens/Auth/Login';
import ForgotScreen from '../Screens/Auth/ForgotPassword';
import Otp from '../Screens/Auth/Otp';
import Profile from '../Screens/Main/Profile';
import Chat from '../Screens/Main/Chat';
const Stack = createStackNavigator();
export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
