import { get_calories,get_statistic } from "./api_list";

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

export const getUserStatistic = async (accessToken, days) => {
	const urlWithDays = `${get_statistic.url}?days=${days}`;
	const url = urlWithDays;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_statistic.method;
	return fetch(url, {
		method,
		headers
	});
}

  