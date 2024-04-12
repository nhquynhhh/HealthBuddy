import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/home';

import React from 'react';

import { View, Text } from 'react-native';

const HomeNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	)
}

export default HomeNavigator;