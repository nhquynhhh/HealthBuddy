import { callDetectAPI } from "../api/api_detect";
import { getAccessToken } from "../../asyncStorage/auth";

export const handleDetect = async (props) => {
	try {
		const accessToken = await getAccessToken();
		const { uri } = props;
		const response = await callDetectAPI(uri, accessToken);
		const data = await response.json();
		return data
	} catch (error) {
		console.error('Error detecting object:', error);
	}	
}