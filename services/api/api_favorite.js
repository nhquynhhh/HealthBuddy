	import { change_favorite, get_favorite_dishes, get_home_favorite_dishes, get_fav_list} from "./api_list";
import { getAccessToken } from "../../asyncStorage/auth";

const callChangeFavorite = async (data) => {
	const accessToken = await getAccessToken();
	const url = change_favorite.url;
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = change_favorite.method;
	const body = JSON.stringify(data);
	return fetch(url, {
		method,
		headers,
		body
	});
}

const callGetFavoriteDishes = async (id) => {
	const accessToken = await getAccessToken();
	const url = get_favorite_dishes.url.replace(':id', id);
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_favorite_dishes.method;
	return fetch(url, {
		method,
		headers
	});
}

const callGetHomeFavoriteDishes = async (id) => {
	const accessToken = await getAccessToken();
	const url = get_home_favorite_dishes.url.replace(':id', id);
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_home_favorite_dishes.method;
	return fetch(url, {
		method,
		headers
	});
}

const callGetFavList = async (id) => {
	const accessToken = await getAccessToken();
	const url = get_fav_list.url.replace(':id', id);
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${accessToken}`
	};
	const method = get_fav_list.method;
	return fetch(url, {
		method,
		headers
	});
}

export { callChangeFavorite, callGetFavoriteDishes, callGetHomeFavoriteDishes, callGetFavList };