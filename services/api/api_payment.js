import { create_payment_url } from './api_list';

export const callPayMentURL = async (type, accessToken) => {
	const url = create_payment_url.url;
	const method = create_payment_url.method;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const body = JSON.stringify({ subscription_type: type });
	return fetch(url, {
		method: method,
		headers: headers,
		body: body
	});
}

