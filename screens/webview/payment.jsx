import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { getPaymentURL } from '../../asyncStorage/auth';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { handleGetAccountInfo } from "../../services/account/get_account_info";
import { handleGetUserInfo } from '../../services/info/get_info';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../services/api/api_list';
export default function Payment({ route }) {
	const { url } = route.params;
	const { userInfo, setAccount, setUserInfo } = useContext(AuthContext);
	const navigation = useNavigation();
	const URL = `${BASE_URL}/confirm_payment`;
	const handleNavigationStateChange = async (navState) => {
		const { url: currentUrl } = navState;
		console.log('Current URL:', currentUrl);

		// Kiểm tra nếu URL là URL thành công bạn mong muốn
		if (currentUrl.includes(URL)) {
			navigation.navigate("HomeTab", "Home"); 
			const accountInfo = await handleGetAccountInfo();
			if (accountInfo) {
				setAccount(accountInfo);
			}
			const userInfo = await handleGetUserInfo();
			if (userInfo) {
				setUserInfo(userInfo);
			}
		}
	};
	return (
		<WebView
			style={styles.container}
			source={{ uri: url }}
			onNavigationStateChange={handleNavigationStateChange}
		/>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
});
