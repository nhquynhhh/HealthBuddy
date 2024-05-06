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

const get_user_info = {
	url: `${BASE_URL}/api/get-user`,
	method: 'GET'
}

const get_account_info = {
	url: `${BASE_URL}/api/get-account-info`,
	method: 'GET'
}

const get_dish_list = {
	url: `${BASE_URL}/api/get-all-dishes`,
	method: 'GET'
}

const get_all_ingredients = {
	url: `${BASE_URL}/api/get-all-ingredients`,
	method: 'GET'
}

const get_recipe_by_dish_id = {
	url: `${BASE_URL}/api/get-recipe-by-dish-id/:id`,
	method: 'GET'
}

export {
	login_api,
	signup_api,
	logout_api,
	otp_required,
	check_acount,
	refresh_token,
	authenticated_account,
	otp_reset_password,
	reset_password,
	update_user_info,
	get_user_info,
	get_account_info,
	get_dish_list,
	get_all_ingredients,
	get_recipe_by_dish_id
};