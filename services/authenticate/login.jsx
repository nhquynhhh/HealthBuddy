import { Alert } from 'react-native';
import { setAccessToken, setRefreshToken } from '../../asyncStorage/auth';
import { callLoginAPI } from '../api/api_login';
import { useAuth } from '../../context/useAuth';

const handleLogin = async (email, password) => {

	// const { storeAccessToken, storeRefreshToken } = useAuth();
	console.log(email);
	console.log(password);
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

		if (response.ok && code === '200') {
			await setAccessToken(access_token);
			await setRefreshToken(refresh_token);
			return true;
		} else {
			Alert.alert('Thông báo', message);
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}
export { handleLogin }