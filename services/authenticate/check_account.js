import { callCheckAccount } from "../api/api_account";

const handleCheckAccount = async (email) => {
	try {
		const response = await callCheckAccount(email);
		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

export { handleCheckAccount }