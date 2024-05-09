import { get_calories } from "./api_list";

export const callGetCalories = async (accessToken) => {
	const url = get_calories.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_calories.method;
	return fetch(url, {
		method,
		headers
	});
}