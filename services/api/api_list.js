export const BASE_URL = 'https://premium-singularly-meerkat.ngrok-free.app';
// export const BASE_URL = 'https://implicitly-charming-eft.ngrok-free.app';
// const BASE_URL = 'https://widely-discrete-glowworm.ngrok-free.app/';

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

const change_favorite = {
	url: `${BASE_URL}/api/change-favorite`,
	method: 'POST'
}

const get_favorite_dishes = {
	url: `${BASE_URL}/api/get-favorite-by-user-id/:id`,
	method: 'GET'
}

const get_home_favorite_dishes = {
	url: `${BASE_URL}/api/get-home-fav/:id`,
	method: 'GET'
}

const get_fav_list = {
	url: `${BASE_URL}/api/get-fav-list-by-user-id/:id`,
	method: 'GET'
}

const get_calories = {
	url: `${BASE_URL}/api/statistic/get-user-calories`,
	method: 'GET'
}

const save_water = {
	url: `${BASE_URL}/api/statistic/add_water`,
	method: 'POST'

}

const get_water = {
	url: `${BASE_URL}/api/statistic/get-user-water`,
	method: 'GET'
}

const get_statistic = {	
	url: `${BASE_URL}/api/statistic/get-sevendays-statistic`,
	method: 'GET'
}

const get_statistic_water = {	
	url: `${BASE_URL}/api/statistic/get-sevendays-water`,
	method: 'GET'
}

const new_genetic_algorithm = {	
	url: `${BASE_URL}/api/new_genetic_algorithm `,
	method: 'GET'
}

const get_suggest_menu = {	
	url: `${BASE_URL}/api/get-suggest-menu `,
	method: 'GET'
}

const recommend_dish = {	
	url: `${BASE_URL}/api/recommend_dish`,
	method: 'GET'
}
const create_payment_url_momo = {
	url: `${BASE_URL}/api/create_payment_url/momo`,
	method: 'POST'
}

const create_payment_url_vnpay = {
	url: `${BASE_URL}/api/create_payment_url/vnpay`,
	method: 'POST'
}

const required_otp_again = {
	url: `${BASE_URL}/api/otp-required-again`,
	method: 'POST'
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
	get_recipe_by_dish_id,
	change_favorite,
	get_favorite_dishes,
	get_home_favorite_dishes,
	get_fav_list,
	get_calories, add_morning, add_noon, add_dinner, add_snack, add_exercise, save_water, get_water,get_statistic,get_statistic_water,new_genetic_algorithm,get_suggest_menu,
	create_payment_url_momo, recommend_dish, required_otp_again, create_payment_url_vnpay
};
