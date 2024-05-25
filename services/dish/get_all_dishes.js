import { callGetDishList } from "../api/api_dish";	
import { getAccessToken } from '../../asyncStorage/auth';

const handleGetDishList = async (page, page_size) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetDishList(accessToken, page, page_size);
		const data = await response.json();
		const {dishes, message, pagination} = data;
		if (response.ok && message === "success") {
			return data;
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