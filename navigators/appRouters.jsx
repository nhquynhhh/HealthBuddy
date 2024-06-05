import React, { useEffect, useState, useContext } from 'react';
import AuthNavigator from './authNavigator';

import MainNavigator from './mainNavigator';

import SplashScreen from '../screens/splash/splashScreen';
import { AuthContext } from '../context/AuthContext';
import { handleLoginWithToken } from '../services/authenticate/login_with_token'
import LoadingModal from './loadingModel';
import ToastManager, { Toast } from 'toastify-react-native'

export const AppRouters = () => {
	const [isShowSplash, setIsShowSplash] = useState(true);
	const [refresh_token, setRefresh_token] = useState(null);
	const [isLogin, setIsLogin] = useState(false);

	const { isLogged, isLoggedWithToken, setIsLoggedWithToken, isLoggedWithPassword, setIsLoggedWithPassword } = useContext(AuthContext);

	// useEffect(() => {
	// 	const timeout = setTimeout(async () => {
	// 		setIsShowSplash(false);
	// 	}, 500);

	// 	return () => clearTimeout(timeout);
	// }, []);

	return (
		<>
			<LoadingModal visible={isLoggedWithToken} />
			<LoadingModal visible={isLoggedWithPassword} />
			{
				isLogged ? <MainNavigator /> : <AuthNavigator />
			}
		</>
	);
}