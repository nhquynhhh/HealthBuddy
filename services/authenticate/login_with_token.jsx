import { callLoginWithTokenAPI } from "../api/api_login";
import { useContext } from "react"; // Import the useContext hook
import { getAccessToken, getRefreshToken, setAccessToken } from "../../asyncStorage/auth";

const handleLoginWithToken = async (refreshToken) => {
	try {
		const response = await callLoginWithTokenAPI({ token: refreshToken });
		const data = await response.json();
		const { access_token, messagse, code } = data;
		if (response.ok && code === '200') {
			await setAccessToken(access_token);
			return true;
		}
	} catch (error) {
		console.error('Error:', error);
		return false;
	}
}

export { handleLoginWithToken }