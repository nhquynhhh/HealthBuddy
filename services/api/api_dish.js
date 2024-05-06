import {get_dish_list} from "./api_list";

const callGetDishList = (accessToken) => {
	const url = get_dish_list.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_dish_list.method;
	return fetch(url, {
		method,
		headers
	});
}

export { callGetDishList };