import { callLoginWithTokenAPI } from "../api/api_login";
import { useContext } from "react";
import { getAccessToken, getRefreshToken, setAccessToken } from "../../asyncStorage/auth";

const handleLoginWithToken = async (refresh_token) => {
	try {
		const response = await callLoginWithTokenAPI({ token: refresh_token });
		const data = await response.json();
		const { access_token, messagse, code } = data;
		console.log('data', data);
		if (response.ok && code === '200') {
			await setAccessToken(access_token);
			return true;
		} else {
			console.log('message', messagse);
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}

export { handleLoginWithToken }