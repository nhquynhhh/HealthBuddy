import { callGetRecipeByDishID } from "../api/api_recipe";
import { getAccessToken } from "../../asyncStorage/auth";

export const handleGetRecipeByDishID = async (dishId) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetRecipeByDishID(dishId, accessToken);
		const data = await response.json();
		if (response.ok) {
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