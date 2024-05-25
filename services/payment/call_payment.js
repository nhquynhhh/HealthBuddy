import { callPayMentURL } from "../api/api_payment";	
import { getAccessToken } from "../../asyncStorage/auth";

export const handlePayMentURL = async (type) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callPayMentURL(type, accessToken);
		const result = await response.json();
		if (response.ok) {
			return result.shortLink;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}