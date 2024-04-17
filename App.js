
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppRouters } from './navigators/appRouters.jsx';
import MainNavigator from './navigators/mainNavigator.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.js';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

	return (
		<>
			{/* <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent /> */}
			{
				<AuthProvider>
					<NavigationContainer>
						<MainNavigator />
					</NavigationContainer>
				</AuthProvider>
			}
		</>
	);
}
// export default function App(){
//     return (
// 		<NavigationContainer>
// 			<BottomNavigation/>
// 		</NavigationContainer>
//     );
// };