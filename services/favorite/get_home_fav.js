import { callGetHomeFavoriteDishes	 } from "../api/api_favorite";

export const handleGetHomeFavoriteDishes = async (id) => {
	try {
		const response = await callGetHomeFavoriteDishes(id);
		const result = await response.json();
		if (response.ok) {
			data = result.favorites;
			console.log(data);
			return data;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}