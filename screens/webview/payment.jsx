import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, Modal, Button, View, Text } from 'react-native';
import { getPaymentURL } from '../../asyncStorage/auth';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { handleGetAccountInfo } from "../../services/account/get_account_info";
import { handleGetUserInfo } from '../../services/info/get_info';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../services/api/api_list';
export default function Payment({ route }) {
	const { url, method, type } = route.params;
	const { userInfo, setAccount, setUserInfo } = useContext(AuthContext);

	const [modalVisible, setModalVisible] = useState(false);
	const [failureModalVisible, setFailureModalVisible] = useState(false);


	const navigation = useNavigation();
	const URL = `${BASE_URL}/confirm_payment/${method}`;
	const handleNavigationStateChange = async (navState) => {
		const { url: currentUrl } = navState;
		console.log('Current URL:', currentUrl);

		// Kiểm tra nếu URL là URL thành công bạn mong muốn
		if (currentUrl.includes(URL)) {
			navigation.navigate("PersonalTab", "Personal");
			// lấy các params trong url
			if (method === 'momo') {
				const resultCodeMatch = currentUrl.match(/resultCode=([^&]+)/);
				const resultCode = resultCodeMatch ? resultCodeMatch[1] : null;
				if (resultCode === '0') {
					const accountInfo = await handleGetAccountInfo();
					if (accountInfo) {
						setAccount(accountInfo);
					}
					const userInfo = await handleGetUserInfo();
					if (userInfo) {
						setUserInfo(userInfo);
					}
				}
			} else if (method === 'vnpay') {
				const responseCodeMatch = currentUrl.match(/vnp_ResponseCode=([^&]+)/);
				const respnseCode = responseCodeMatch ? responseCodeMatch[1] : null;
				if (respnseCode === '00') {
					const accountInfo = await handleGetAccountInfo();
					if (accountInfo) {
						setAccount(accountInfo);
						console.log(accountInfo)
					}
					const userInfo = await handleGetUserInfo();
					if (userInfo) {
						setUserInfo(userInfo);
					}
				}	
			}
		}
	};
	return (
		<View style={styles.container}>
			<WebView
				source={{ uri: url }}
				onNavigationStateChange={handleNavigationStateChange}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center'
	}
});
