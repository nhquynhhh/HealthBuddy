import { otp_required } from "./apis";

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

export { otp_required_api };