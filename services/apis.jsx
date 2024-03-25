const BASE_URL = 'https://premium-singularly-meerkat.ngrok-free.app';


const login_api = {
	url: `${BASE_URL}/api/login`,
	method: 'POST'
}

const signup_api = {
	url: `${BASE_URL}/api/signup`,
	method: 'POST'
};

const logout_api = {
	url: `${BASE_URL}/api/logout`,
	method: 'POST'
}

const otp_required = {
	url: `${BASE_URL}/api/otp-required`,
	method: 'POST'
}

export { login_api, signup_api, logout_api, otp_required };