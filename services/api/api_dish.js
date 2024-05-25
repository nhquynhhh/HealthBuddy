import {get_dish_list} from "./api_list";

const callGetDishList = (accessToken, page, page_size) => {
	// const url = get_dish_list.url;
	const url = `${get_dish_list.url}?page=${page}&page_size=${page_size}`;
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