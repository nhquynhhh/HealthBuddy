import { Alert } from 'react-native';
import { storeAccessToken, storeRefreshToken } from '../../asyncStorage/auth';
import { callLoginAPI } from '../api/api_login';
import React, {useContext} from 'react';

const handleLogin = async (email, password, navigation) => {
	try {
		const response = await callLoginAPI({ email: email, password: password });
		const data = await response.json();
		const { token, message, code } = data;
		const access_token = token['access_token'];
		const refresh_token = token['refresh_token'];
		console.log(message);
		console.log(code);
		console.log(access_token);
		console.log(refresh_token);
		
		await storeAccessToken(access_token);
		await storeRefreshToken(refresh_token);

		if (response.ok && code === '200') {
			navigation.navigate('Home');
		} else {
			Alert.alert('Thông báo', message);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export { handleLogin }