
import React, { useEffect, useState } from 'react';
import { AppRouters } from './navigators/appRouters.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.js';
import { NavigationContainer, } from '@react-navigation/native';
import {handleNotification, scheduleAlarm} from './services/notification/NotificationHandler.js';
export default function App() {

	// useEffect(() => {
	// 	handleNotification();
	// }, []);


	return (
		<AuthProvider>
			<NavigationContainer>
				<AppRouters />
			</NavigationContainer>
		</AuthProvider>
	);
}
