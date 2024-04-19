import { refresh_token } from "./api_list";

const refresh_token_api = (props) => {
	const { refreshToken } = props;
	const { url, method } = refresh_token;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${refreshToken}`
	};

	return fetch(url, {
		method,
		headers
	});
}

export { refresh_token_api };