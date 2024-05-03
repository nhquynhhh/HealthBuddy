import { update_user_info, get_user_info } from "./api_list";

const callUpdateUserInfoAPI = async (props) => {
	const {gender, age, height, weight, aim, accessToken} = props;
	const url = update_user_info.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = update_user_info.method;
	const data = {
		age: age,
		weight: weight,
		height: height,
		gender: gender,
		aim: aim
	}
	return fetch(url, {
		method,
		headers,
		body: JSON.stringify(data)
	});
}

const callGetUserInfoAPI = async (accessToken) => {
	const url = get_user_info.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_user_info.method;
	return fetch(url, {
		method,
		headers
	});
}

export { callUpdateUserInfoAPI, callGetUserInfoAPI };