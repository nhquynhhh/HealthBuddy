import { callUpdateUserInfoAPI, callGetUserInfoAPI } from "../api/api_user_info";
import { getAccessToken, getRefreshToken } from '../../asyncStorage/auth';

const handleUpdateUserInfo = async (props) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callUpdateUserInfoAPI({ ...props, accessToken });
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

export { handleUpdateUserInfo }