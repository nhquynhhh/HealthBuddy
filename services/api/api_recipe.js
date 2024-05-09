import { get_recipe_by_dish_id } from "./api_list";

export const callGetRecipeByDishID = async (dishId, accessToken) => {
	const url = get_recipe_by_dish_id.url.replace(":id", dishId);
	const method = get_recipe_by_dish_id.method;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};

	return fetch(url, {
		method: method,
		headers: headers
	});
}