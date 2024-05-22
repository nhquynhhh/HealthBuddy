
import React, { useEffect, useState } from 'react';
import { AppRouters } from './navigators/appRouters.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.js';
import { NavigationContainer, } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import MainNavigator from './navigators/mainNavigator.jsx';
import Change from './screens/change/change.jsx';


export default function App() {

	return (
		<AuthProvider>
			<NavigationContainer>
				<AppRouters />
			</NavigationContainer>
		</AuthProvider>
	);
}
// export default function App(){
//     return (
// 		<NavigationContainer>
// 			<AppRouters/>
// 		</NavigationContainer>
//     );
// };