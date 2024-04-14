import {reset_password} from './api_list';

const callResetPassword = ( password, token) => {
	const url = reset_password.url;
	const data = {
		password: password
	};
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	const method = reset_password.method;
	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

export { callResetPassword };