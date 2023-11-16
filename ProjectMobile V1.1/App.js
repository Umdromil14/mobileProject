import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp  from './components/signUp';
import SignIn  from './components/signIn';
import Account  from './components/account';
import { Screens } from "./tools/BottomNav";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
          screen: 'Home/ScreenA',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Home"
        component={<View><Text>Home</Text></View>}
      />
      <Tab.Screen
        initialParams={{
          screen: 'Settings/ScreenA',
        }}
        options={{
          unmountOnBlur: true,
        }}
        name="Settings"
        component={<View><Text>Hello</Text></View>}
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
