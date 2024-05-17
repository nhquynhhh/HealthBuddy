import { add_morning, add_dinner, add_exercise, add_noon, add_snack } from './api_list';
import {
	getAccessToken
} from '../../asyncStorage/auth';


async function save_calories_morning(breakfast) {
	const authToken = await getAccessToken();
	const url = add_morning.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('breakfast', url, breakfast);
	const data = {
		morning_calo: parseInt(breakfast)
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		});
		console.log(headers);
		if (!response.ok) {
			throw new Error('Failed to save calories');
		}
		return response.json();
	} catch (error) {
		throw error;
	}
}

async function save_calories_lunch(lunch) {
	const authToken = await getAccessToken();
	const url = add_noon.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('lunch', url, lunch);
	const data = {
		noon_calo: parseInt(lunch)
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

async function save_calories_dinner(dinner) {
	const authToken = await getAccessToken();
	const url = add_dinner.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('dinner', url, dinner);
	const data = {
		dinner_calo: parseInt(dinner)
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

async function save_calories_snack(snack) {
	const authToken = await getAccessToken();
	const url = add_snack.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('snack', url, snack);
	const data = {
		snack_calo: parseInt(snack)
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

async function save_calories_exercise(exercise) {
	const authToken = await getAccessToken();
	const url = add_exercise.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${authToken}`
	};
	console.log('exercise', url, exercise);
	const data = {
		exercise_calo: parseInt(exercise)
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


export { save_calories_morning, save_calories_lunch, save_calories_dinner, save_calories_snack, save_calories_exercise };