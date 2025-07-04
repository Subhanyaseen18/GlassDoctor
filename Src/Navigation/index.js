import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import Login from '../Screens/Auth/Login';
import ForgotScreen from '../Screens/Auth/ForgotPassword';
import Otp from '../Screens/Auth/Otp';
import Profile from '../Screens/Main/Profile';
import Chat from '../Screens/Main/Chat';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const token = useSelector(state => state.user);

  console.log('token', token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="HomeStack" component={HomeStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};
export default MainStack;
