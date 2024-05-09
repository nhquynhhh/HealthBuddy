import { callGetUserInfoAPI } from "../api/api_user_info";
import { getAccessToken } from '../../asyncStorage/auth';
const handleGetUserInfo = async () => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetUserInfoAPI(accessToken);
		const data = await response.json();
		if (response.ok) {
			console.log(data);
			return data;
		} else {
			console.log(data.message);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export { handleGetUserInfo }