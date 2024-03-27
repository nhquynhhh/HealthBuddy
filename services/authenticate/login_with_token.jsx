import { callLoginWithTokenAPI } from "../api/api_login";
import { getAccessToken, getRefreshToken, storeAccessToken } from "../../asyncStorage/auth";
import { isExpired } from "../../utils/validation";


const handleLoginWithToken = async (refreshToken) => {
	try {
		const response = await callLoginWithTokenAPI({ token: refreshToken });
		const data = await response.json();
		const { access_token, messagse, code } = data;
		if (response.ok && code === '200') {
			await storeAccessToken(access_token);
			return true;
		}
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}

export { handleLoginWithToken }