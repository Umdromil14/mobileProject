import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Discover from './discover';
import NewGames from './newGames';
import GamePreview from './gamePreview';

const Stack = createNativeStackNavigator();

/**
 * Function creating a new nested stack navigator inside of the discover page
 *
 * @returns {JSX.Element} header of the application
 */
export default function DiscoverNav() {
    return (
        <Stack.Navigator initialRouteName="Discover" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Discover" component={Discover} />
            <Stack.Screen name="NewGames" component={NewGames} />
            <Stack.Screen name="GamePreview" component={GamePreview} />
        </Stack.Navigator>
    );
}