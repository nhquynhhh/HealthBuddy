import { callGetFavoriteDishes } from "../api/api_favorite";

export const handleGetFavoriteDishes = async (id) => {
	try {
		const response = await callGetFavoriteDishes(id);
		const result = await response.json();
		if (response.ok) {
			return result.favorites
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}