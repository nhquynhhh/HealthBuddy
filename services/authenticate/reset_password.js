import { callResetPassword } from "../api/api_password";
import { getAccessToken, setAccessToken, setRefreshToken } from "../../asyncStorage/auth";

const handleResetPassword = async (password) => {
	const tokenData = await getAccessToken();
	console.log(tokenData);
	const response = await callResetPassword(password, tokenData);
	const data = await response.json();
	const { message, code, token } = data;
	if (response.ok && code === '200') {
		console.log('Reset password successfully');
		const access_token = token['access_token'];
		const refresh_token = token['refresh_token'];
		console.log(message);
		console.log('access_token:', access_token);
		console.log('refresh_token:', refresh_token);
		await setAccessToken(access_token);
		await setRefreshToken(refresh_token);
		return true;
	} else {
		console.log('Reset password failed');
		return false;
	}
}

export { handleResetPassword }