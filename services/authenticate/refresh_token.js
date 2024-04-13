import { getAccessToken, getRefreshToken, storeAccessToken, storeRefreshToken } from "../../asyncStorage/auth";	
import { isExpired } from "../../utils/validation";
import { refresh_token_api } from "../api/api_token";

const refreshAccessToken = async () => {
	let accessToken = await getAccessToken();
	let refreshToken = await getRefreshToken();

	if (accessToken === null || refreshToken === null) {
		return false;
	}

	try {
		const reponse = await refresh_token_api({ token: refreshToken });
		const data = await reponse.json();
		const { accessToken } = data;
		await storeAccessToken(accessToken);
		return true;	
	} catch (error) {
		console.error('Error:', error);
		return false;
	}

}

export { refreshAccessToken }