import {call_get_water} from '../api/api_water';

export const handleGetWater = async () => {
	const response = await call_get_water();
	const result = await response.json();
	if (response.ok) {
		return result.total_water;
	} else {
		return 0;
	}
}