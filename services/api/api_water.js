import { save_water, get_water, get_statistic_water } from "./api_list";
import { getAccessToken } from "../../asyncStorage/auth";

async function call_save_water(water) {
	const authToken = await getAccessToken();
	const url = save_water.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('water', url, water);
	const data = {
		water: parseInt(water)
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			throw new Error('Failed to save calories');
		}
		return response.json();
	} catch (error) {
		throw error;
	}
}

const call_get_water = async() => {
	const authToken = await getAccessToken();
	const url = get_water.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	return fetch(url, {
		method: 'GET',
		headers: headers
	});
}
async function getUserStatisticWater(accessToken, days) {
	const urlWithDays = `${get_statistic_water.url}?days=${days}`;
	const url = urlWithDays;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_statistic_water.method;
	return fetch(url, {
		method,
		headers
	});
}

export {
	call_save_water, call_get_water, getUserStatisticWater
}

