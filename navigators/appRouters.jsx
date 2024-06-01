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

	const { isLogged, isLoggedWithToken, setIsLoggedWithToken } = useContext(AuthContext);

	// useEffect(() => {
	// 	const timeout = setTimeout(async () => {
	// 		setIsShowSplash(false);
	// 	}, 500);

	// 	return () => clearTimeout(timeout);
	// }, []);

	useEffect(() => {

		if (isLogged) {
			Toast.success('Đăng nhập thành công', {
				position: 'top',
				duration: 5000,
				hideOnPress: true,
				visibilityTime: 4000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
				onShow: () => console.log('show'),
				onHide: () => console.log('hide')
			})	
		}
	}, [isLogged]);
	return (
		<>
			<LoadingModal visible={isLoggedWithToken} />
			<ToastManager
				width={'100%'}
				height={100}
				position={'top'}
				positionValue={0}
				duration={7000}
				textStyle={{ fontSize: 15, lineHeight: 25, paddingRight: 5 }}
				style={{ paddingRight: 5 }} />
			{
				isLogged ? <MainNavigator /> : <AuthNavigator />
			}
		</>
	);
}