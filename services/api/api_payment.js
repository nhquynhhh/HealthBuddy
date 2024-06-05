import { create_payment_url_momo, create_payment_url_vnpay } from './api_list';

export const callPayMentURLMOMO = async (type, accessToken) => {
	const url = create_payment_url_momo.url;
	const method = create_payment_url_momo.method;
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

export const callPayMentURLVNPAY = async (type, accessToken) => {
	const url = create_payment_url_vnpay.url;
	const method = create_payment_url_vnpay.method;
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