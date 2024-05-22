import { getUserStatistic } from "../api/api_calories";
import { getAccessToken } from "../../asyncStorage/auth";

export const handleGetStatic = async (days) => {
    try {
        // Lấy accessToken từ AsyncStorage
        const accessToken = await getAccessToken();
        
        // Gọi hàm API để lấy dữ liệu thống kê sử dụng accessToken và days
        const response = await getUserStatistic(accessToken, days);
        console.log(response);
        // Chuyển đổi phản hồi sang JSON
        const result = await response.json();

        // Kiểm tra xem phản hồi có thành công hay không
        if (response.ok) {
            console.log(result);
            return result;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error; // Ném lỗi ra ngoài để xử lý tiếp
    }
}