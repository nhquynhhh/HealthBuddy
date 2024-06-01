import { callPayMentURLMOMO, callPayMentURLVNPAY } from "../api/api_payment";	
import { getAccessToken } from "../../asyncStorage/auth";

export const handlePayMentURLMOMO = async (type) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callPayMentURLMOMO(type, accessToken);
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

export const handlePayMentURLVNPAY = async (type) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callPayMentURLVNPAY(type, accessToken);
		const result = await response.json();
		if (response.ok) {
			return result.url;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

