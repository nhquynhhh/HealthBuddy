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
import { handleLoginWithToken } from '../services/authenticate/login_with_token'

export const AppRouters = () => {
	const [isShowSplash, setIsShowSplash] = useState(true);
	const [refresh_token, setRefresh_token] = useState(null);
	const [isLogin, setIsLogin] = useState(false);

	const { storeAccessToken, storeRefreshToken, accessTokenContext, isLogged, setLoginStatus } = useContext(AuthContext);

	const checkToken = async () => {
		const refresh = await getRefreshToken();
		if (refresh !== null) {
			console.log('There is a refresh token in the storage')
			setRefresh_token(refresh);
			return true;
		}
		return false;
	}

	const checkLogin = async () => {
		const isToken = await checkToken();
		if (isToken === true) {
			console.log('Checking token validity')
			const isValidToken = await handleLoginWithToken(await getRefreshToken());
			console.log('isValidToken', isValidToken);
			if (isValidToken === true) {
				setLoginStatus(true);
			} else {
				console.log('Token is invalid')
				setLoginStatus(false);
			}
		} else {
			setLoginStatus(false);
		}
	}

	useEffect(() => {
		const timeout = setTimeout(async () => {
			// Thực hiện checkLogin khi splash screen đang hiển thị
			await checkLogin();
			// Sau khi checkLogin hoàn thành, ẩn splash screen
			setIsShowSplash(false);
		}, 500);
	
		return () => clearTimeout(timeout);
	}, []);
	
	useEffect(() => {
		if (isLogged === true) {
			setIsLogin(true);
		}
		else {
			setIsLogin(false);
		}
	}, [isLogged]);

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