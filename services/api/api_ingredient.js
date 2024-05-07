import { get_all_ingredients } from "./api_list";

const callGetAllIngredients = (accessToken) => {
	const url = get_all_ingredients.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_all_ingredients.method;
	return fetch(url, {
		method,
		headers
	});
}

export { callGetAllIngredients };