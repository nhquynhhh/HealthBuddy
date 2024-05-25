import { callNewGeneticAlgorithm,callGetSuggestMenu } from "../api/api_menu";
import { getAccessToken } from "../../asyncStorage/auth";

export const handleNewGeneticAlgorithm= async () => {
    try {
        // Lấy accessToken từ AsyncStorage
        const accessToken = await getAccessToken();
        
        // Gọi hàm API để lấy dữ liệu thống kê sử dụng accessToken và days
        const response = await callNewGeneticAlgorithm(accessToken);
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

export const handleGetSuggestMenu = async () => {
    try {
        // Lấy accessToken từ AsyncStorage
        const accessToken = await getAccessToken();
        
        // Gọi hàm API để lấy dữ liệu thống kê sử dụng accessToken và days
        const response = await callGetSuggestMenu (accessToken);
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