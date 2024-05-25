import { callGetCalories } from "../api/api_calories";
import { getAccessToken } from "../../asyncStorage/auth";

export const handleGetCalories = async () => {
	const accessToken = await getAccessToken();
	const response = await callGetCalories(accessToken);
	const result = await response.json();
	if (response.ok) {
		console.log(result);
		return result;
	} else {
		console.log(result.message);
		return 0;
	}
}

