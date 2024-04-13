import { otp_required, authenticated_account } from "./api_list";

function otp_required_api(props) {
	const { email, reset } = props;
	const url = otp_required.url;
	const data = {
		email: email,
		reset: reset
	};
	const headers = {
		'Content-Type': 'application/json'
	};
	const method = otp_required.method;
	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

function callAuthenAccAPI(props) {
	const { otp, encrypted, token } = props;
	const url = authenticated_account.url;
	const data = {
		otp: otp,
		encrypted: encrypted
	};
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	const method = authenticated_account.method;
	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

export { otp_required_api, callAuthenAccAPI };