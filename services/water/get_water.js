import {call_get_water} from '../api/api_water';

export const handleGetWater = async () => {
	const response = await call_get_water();
	if (response) {
		return response.total_water;
	} else {
		return 0;
	}
}