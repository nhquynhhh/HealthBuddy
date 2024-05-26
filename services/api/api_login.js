import { login_api, signup_api, logout_api } from "./api_list";


function callLoginAPI(props) {
	const { email, password } = props;
	const url = login_api.url;
	const data = {
		email: email,
		password: password
	};
	const headers = {
		'Content-Type': 'application/json'
	};
	console.log(url);
	const method = login_api.method;
	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

function callLoginWithTokenAPI(props) {
	const { token } = props;
	const url = login_api.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	const method = login_api.method;
	return fetch(url, {
		method: method,
		headers: headers
	});
}

export { callLoginAPI, callLoginWithTokenAPI };