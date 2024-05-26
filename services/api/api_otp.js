import { otp_required, authenticated_account, otp_reset_password, required_otp_again } from "./api_list";

function CallOTPAPI(props) {
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

function callAuthenOTPPass(props) {
	const { otp, encrypted, token } = props;
	const url = otp_reset_password.url;
	const data = {
		otp: otp,
		encrypted: encrypted
	};
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	const method = otp_reset_password.method;
	return fetch(url, {
		method: method,
		headers: headers,
		body: JSON.stringify(data)
	});
}

function callOTPAgain(token) {
	const url = required_otp_again.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	};
	const method = required_otp_again.method;
	return fetch(url, {
		method: method,
		headers: headers,
	});
}
export { CallOTPAPI, callAuthenAccAPI, callAuthenOTPPass, callOTPAgain };