import React, { useEffect, useState, useContext } from 'react';
import AuthNavigator from './authNavigator';

import MainNavigator from './mainNavigator';

import SplashScreen from '../screens/splash/splashScreen';
import {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
	getRefreshToken,
	setEncrypted,
	getEncrypted
} from '../asyncStorage/auth';
import { AuthContext } from '../context/AuthContext';
import { login_with_token } from '../services/api_login';
import { handleLoginWithToken } from '../services/authenticate/login_with_token'
import { handleLogin } from '../services/authenticate/login'

export const AppRouters = () => {
	const [isShowSplash, setIsShowSplash] = useState(true);
	const [refresh_token, setRefresh_token] = useState(null);
	const [isLogin, setIsLogin] = useState(false);

	const { storeAccessToken, storeRefreshToken, accessTokenContext } = useContext(AuthContext);

	const checkToken = async () => {
		const refresh = await getRefreshToken();
		if (refresh !== null) {
			setRefresh_token(refresh);
			storeRefreshToken(refresh);
			return true;
		}
		return false;
	}

	const checkLogin = async () => {
		if (await checkToken() === true) {
			handleLoginWithToken(refresh_token);
			storeAccessToken(await getAccessToken());
			setIsLogin(true);
		} else {
			if (accessTokenContext !== null) {
				setIsLogin(true);
			} else {
				setIsLogin(false);
			}
		}
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsShowSplash(false);
		}, 1500);

		return () => clearTimeout(timeout)
	}, []);

	useEffect(() => {
		checkLogin();
	}, []);

	return (
		<>
			{
				isShowSplash ? <SplashScreen /> : (
					isLogin ? <MainNavigator /> : <AuthNavigator />
				)
			}
		</>
	);
}