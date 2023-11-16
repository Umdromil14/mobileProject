import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp  from './components/signUp';
import SignIn  from './components/signIn';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Games from './components/games';
import Discover from './components/discover';
import Account from './components/account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home(){
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        initialParams={{
          screen: 'Home/Games',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Games"
        component={Games}
      />
      <Tab.Screen
        initialParams={{
          screen: 'Home/Discover',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Discover"
        component={Discover}
      />
      <Tab.Screen
        initialParams={{
          screen: 'Home/Discover',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Account"
        component={Account}
      />
    </Tab.Navigator>

  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown : false}}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#443D3D',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
