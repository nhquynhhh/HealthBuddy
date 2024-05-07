import { check_acount, get_account_info } from "./api_list";

const callCheckAccount = (email) => {
	const url = check_acount.url + `?email=${email}`;
	const headers = {
		'Content-Type': 'application/json'
	};
	const method = check_acount.method;
	return fetch(url, {
		method: method,
		headers: headers,
	});
}

const callGetAccountInfo = (accessToken) => {
	const url = get_account_info.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_account_info.method;
	return fetch(url, {
		method,
		headers
	});
}

export { callCheckAccount, callGetAccountInfo };