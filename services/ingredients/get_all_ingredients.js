import { getAccessToken } from '../../asyncStorage/auth';
import { callGetAllIngredients } from '../api/api_ingredient';

const handleGetAllIngredients = async () => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetAllIngredients(accessToken);
		const data = await response.json();
		const {ingredients, message} = data;
		if (response.ok && message === "success") {
			return ingredients;
		} else {
			console.log(message);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}

}

export { handleGetAllIngredients };