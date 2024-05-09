import { check_acount } from "./api_list";

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

export { callCheckAccount };