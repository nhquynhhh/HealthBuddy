import { signup_api } from "./api_list";

function callSignupAPI(props) {
	const {username, email, password} = props;
	const url = signup_api.url;
	const headers = {
		'Content-Type': 'application/json'
	};
	const method = signup_api.method;
	data = {
		username: username,
		email: email,
		password: password
	}
	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	})
}

export { callSignupAPI };