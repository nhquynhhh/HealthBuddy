import { CallOTPAPI } from "../api/api_otp";
import { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, setEncrypted, getEncrypted } from '../../asyncStorage/auth';

const callOTPPassAPI = async (email) => {
	try {
		const response = await CallOTPAPI({ email: email, reset: 'true' });
		if (response.ok) {
			const data = await response.json();
			const { encrypted, message, token } = data;
			const { access_token, refresh_token } = token;
			console.log(access_token);
			setAccessToken(access_token);
			setEncrypted(encrypted);
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export { callOTPPassAPI }