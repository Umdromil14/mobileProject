import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faMagnifyingGlass, faGamepad } from '@fortawesome/free-solid-svg-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import SignUp from './components/signUp';
import SignIn from './components/signIn';
import Account from './components/account';
import Discover from './components/discover';
import Games from './components/GameSearch/Games';
// import Games from './components/games';
import Settings from './components/Settings';
import GamePreview from './components/gamePreview';
import { DARK_GREY, GREEN, LIGHT_GREY } from "./tools/constants";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator
            initialRouteName="Discover"
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: "white",
                // tabBarActiveTintColor: "#59A52C",
                tabBarActiveTintColor: GREEN,
                // tabBarActiveBackgroundColor: "#5F5757",
                tabBarActiveBackgroundColor: LIGHT_GREY,
                // tabBarInactiveBackgroundColor: "#1A1717",
                tabBarInactiveBackgroundColor: DARK_GREY,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 80,
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    marginBottom: 15,
                    fontSize: 13
                }
            }}>
            <Tab.Screen
                initialParams={{
                    screen: 'Home/Games',
                }}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "GAMES",
                    tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faGamepad} size={30} style={{ color: color }} />),
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
                    tabBarLabel: "DISCOVER",
                    tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faMagnifyingGlass} size={24} style={{ color: color }} />)
                }}
                name="Discover"
                component={Discover}
            />
            <Tab.Screen
                initialParams={{
                    screen: 'Home/Account',
                }}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: "ACCOUNT",
                    tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faUser} size={24} style={{ color: color }} />)
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
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="GamePreview" component={GamePreview} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
