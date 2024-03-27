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

const check_acount = {
	url: `${BASE_URL}/api/check-account`,
	method: 'GET'

}

const refresh_token = {
	url: `${BASE_URL}/api/refresh`,
	method: 'POST'
}

export { login_api, signup_api, logout_api, otp_required, check_acount, refresh_token };