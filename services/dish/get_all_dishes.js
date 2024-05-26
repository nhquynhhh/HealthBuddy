import { callGetDishList,callRecommendDish } from "../api/api_dish";	
import { getAccessToken } from '../../asyncStorage/auth';

const handleGetDishList = async (page, page_size) => {
	const accessToken = await getAccessToken();
	try {
		const response = await callGetDishList(accessToken, page, page_size);
		const data = await response.json();
		const {dishes, message, pagination} = data;
		if (response.ok && message === "success") {
			return data;
		} else {
			console.log(message);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}
const handleRecommendDish = async (current_page, main_category) => {
    try {
        // Lấy accessToken từ AsyncStorage
        const accessToken = await getAccessToken();
        
        // Gọi hàm API để lấy dữ liệu thống kê sử dụng accessToken và days
        const response = await callRecommendDish(accessToken,current_page,main_category);
        // Chuyển đổi phản hồi sang JSON
        const result = await response.json();
		console.log("result", result);

        // Kiểm tra xem phản hồi có thành công hay không
        if (response.ok) {
            return result;
        } else {
            return 0;
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error; // Ném lỗi ra ngoài để xử lý tiếp
    }
}

export { handleGetDishList, handleRecommendDish};