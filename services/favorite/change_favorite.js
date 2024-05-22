import { callChangeFavorite } from "../api/api_favorite";


export const handleChangeFavorite = async (data) => {
	try {
		const response = await callChangeFavorite(data);
		const result = await response.json();
		if (response.ok) {
			const { favorites, message } = result;
			return { favorites, message };
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}