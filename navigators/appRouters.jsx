import React, { useEffect, useState, useContext } from 'react';
import AuthNavigator from './authNavigator';

import MainNavigator from './mainNavigator';

import SplashScreen from '../screens/splash/splashScreen';
import { AuthContext } from '../context/AuthContext';
import { handleLoginWithToken } from '../services/authenticate/login_with_token'

export const AppRouters = () => {
	const [isShowSplash, setIsShowSplash] = useState(true);
	const [refresh_token, setRefresh_token] = useState(null);
	const [isLogin, setIsLogin] = useState(false);

	const { storeAccessToken, storeRefreshToken, accessTokenContext, isLogged, setLoginStatus, refreshTokenContext } = useContext(AuthContext);

	useEffect(() => {
		const timeout = setTimeout(async () => {
			setIsShowSplash(false);
		}, 500);

		return () => clearTimeout(timeout);
	}, []);
	
	return (
		<>
			{
				isShowSplash ? <SplashScreen /> : (
					isLogged ? <MainNavigator /> : <AuthNavigator />
				)
			}
		</>
	);
}