import {get_dish_list,recommend_dish} from "./api_list";

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
const callRecommendDish = (accessToken,current_page,main_category) => {
	const urlFetch = `${recommend_dish.url}?page=${current_page}&main_category=${main_category}`;
	const url = urlFetch;
	console.log("url", url);
	const headers = {
		'Content-Type': 'application/json',	
		'Authorization': `Bearer ${accessToken}`
	};
	const method = recommend_dish.method;
	return fetch(url, {
		method,
		headers
	});
}
export { callGetDishList,callRecommendDish };
