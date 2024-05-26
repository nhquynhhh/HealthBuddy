import { getUserStatisticWater } from "../api/api_water";
import { getAccessToken } from "../../asyncStorage/auth";

export const handleGetStaticWater = async (days) => {
	// Lấy accessToken từ AsyncStorage
	const accessToken = await getAccessToken();

	// Gọi hàm API để lấy dữ liệu thống kê sử dụng accessToken và days
	const response = await getUserStatisticWater(accessToken, days);
	console.log(response);
	// Chuyển đổi phản hồi sang JSON
	const result = await response.json();
	if (response.ok) {
		console.log(result);
		return result;
	} else {
		return 0;
	}
}