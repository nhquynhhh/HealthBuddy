//const BASE_URL = 'https://premium-singularly-meerkat.ngrok-free.app';
const BASE_URL = 'https://implicitly-charming-eft.ngrok-free.app';

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

const authenticated_account = {
	url: `${BASE_URL}/api/otp-authenticated-account`,
	method: 'POST'
}

const otp_reset_password = {
	url: `${BASE_URL}/api/otp-reset-password`,
	method: 'POST'
}

const reset_password = {
	url: `${BASE_URL}/api/reset-password`,
	method: 'POST'
}

const update_user_info = {
	url: `${BASE_URL}/api/update-user`,
	method: 'POST'
}
const add_morning = {
	url: `${BASE_URL}/api/statistic/add_morning`,
	method: 'POST'
}

const add_noon = {
	url: `${BASE_URL}/api/statistic/add_noon`,
	method: 'POST'
}

const add_dinner = {
	url: `${BASE_URL}/api/statistic/add_dinner`,
	method: 'POST'
}


const add_snack = {
	url: `${BASE_URL}/api/statistic/add_snack`,
	method: 'POST'
}

const add_exercise = {
	url: `${BASE_URL}/api/statistic/add_exercise`,
	method: 'POST'
}

export { login_api, signup_api, logout_api, otp_required, check_acount, refresh_token, authenticated_account, otp_reset_password, reset_password, update_user_info, add_morning, add_noon, add_dinner, add_snack, add_exercise};