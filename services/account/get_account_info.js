import {callGetAccountInfo} from '../api/api_account';
import { getAccessToken } from '../../asyncStorage/auth';

const handleGetAccountInfo = async () => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetAccountInfo(accessToken);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
}

export {handleGetAccountInfo}