import { jwtDecode } from "jwt-decode";

export const validateToken = (token) => {
	const {exp} = jwtDecode(token);
	const currentTime = Date.now() / 1000;
	if (exp < currentTime) {
		return false;
	}
	return true;
}