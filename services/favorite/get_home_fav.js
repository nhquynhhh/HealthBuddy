import { callGetHomeFavoriteDishes	 } from "../api/api_favorite";

export const handleGetHomeFavoriteDishes = async (id) => {
	try {
		const response = await callGetHomeFavoriteDishes(id);
		const result = await response.json();
		if (response.ok) {
			console.log(result);
			return result.favorites
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}