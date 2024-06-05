import { callSignupAPI } from "../api/api_signup";
import { setAccessToken, setRefreshToken, setEncrypted } from '../../asyncStorage/auth';

const signup = async (props) => {
	const { username, email, password } = props;


	const response = await callSignupAPI({ username: username, email: email, password: password });
	const data = await response.json();
	const { message, token, encrypted, code } = data;

	if (response.ok && code === '201') {
		const accessToken = token['access_token'];
		const refreshToken = token['refresh_token'];
		const encryptedString = encrypted;

		console.log('Access Token: ' + accessToken);
		console.log('Refresh Token: ' + refreshToken);
		console.log('Encrypted String: ' + encryptedString);

		await setAccessToken(accessToken);
		await setRefreshToken(refreshToken);
		await setEncrypted(encryptedString);
		return true;
	} else {
		console.log(message);
		return false;
	}
}


export { signup }