import { callGetDishList } from "../api/api_dish";	
import { getAccessToken } from '../../asyncStorage/auth';

const handleGetDishList = async () => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetDishList(accessToken);
		const data = await response.json();
		const {dishes, message} = data;
		if (response.ok && message === "success") {
			return dishes;
		} else {
			console.log(message);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}

export { handleGetDishList };