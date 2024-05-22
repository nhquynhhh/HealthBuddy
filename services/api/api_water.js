import { save_water, get_water } from "./api_list";
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

async function call_get_water() {
	const authToken = await getAccessToken();
	const url = get_water.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('get_water', url);
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: headers
		});
		if (!response.ok) {
			throw new Error('Failed to get water');
		}
		return response.json();
	} catch (error) {
		throw error;
	}
}

export {
	call_save_water, call_get_water
}