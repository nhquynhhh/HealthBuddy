import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { Component, useState, useContext } from 'react'
import { Icon, Button, Divider, ListItem } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { colors } from '../../utils/colors'
import { handlePayMentURLMOMO, handlePayMentURLVNPAY } from '../../services/payment/call_payment'
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import Payment from '../webview/payment';
import { setPaymentURL } from '../../asyncStorage/auth';
import { AuthContext } from '../../context/AuthContext';
import { set } from 'date-fns';
export default function Premium() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();
	const [url, setUrl] = useState('');
	const { paymentURL, setPaymentURL } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [showPaymentOptions, setShowPaymentOptions] = useState(false);
	const [selectedMethod, setSelectedMethod] = useState(null);

	const upgradePack = [
		{ label: '550.000đ / năm', value: "yearly" },
		{ label: '50.000đ / tháng', value: "monthly" }
	]

	const [upgradePackSelected, setUpgradePackSelected] = useState('yearly');
	const [webViewUrl, setWebViewUrl] = useState(null);

	const handleRadioPress = (value) => {
		setUpgradePackSelected(value); // Cập nhật giá trị được chọn vào state
		console.log('Giá trị được chọn:', value); // In ra giá trị được chọn
	};

	const handlePayment = async () => {
		if (selectedMethod === null) {
			Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán');
			return;
		}
		setIsLoading(true);
		let response = null;
		if (selectedMethod === 'momo') {
			response = await handlePayMentURLMOMO(upgradePackSelected);
			console.log(response);
		} else if (selectedMethod === 'vnpay') {
			response = await handlePayMentURLVNPAY(upgradePackSelected);
			console.log(response);
		}
		if (response !== null) {
			navigation.navigate('Payment', { url: response, method: selectedMethod, type: upgradePackSelected });
			setIsLoading(false);
		} else {
			Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau');
		}
	}

	const handlePaymentOptions = () => {
		setShowPaymentOptions(true);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
			<ScrollView style={styles.container}>
				{isLoading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size="large" color={colors.blue} />
						<Text style={styles.loadingText}>Đang tải...</Text>
					</View>
				)}
				<View style={{ marginLeft: 30 }}>
					<View style={{ alignItems: 'center', position: 'relative' }}>
						<LinearGradient
							colors={[colors.blue, colors.lightBlue]}
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							style={{ borderRadius: 15, padding: 10, width: windowWidth * 0.7, marginTop: 5 }}>
							<Text style={{ color: colors.white, textAlign: 'right', paddingRight: 10, fontSize: 16, lineHeight: 25 }}>
								Tiện ích không giới hạn{"\n"}với <Text style={{ fontWeight: 700 }}>tài khoản PREMIUM</Text>
							</Text>
						</LinearGradient>
					</View>
					<Image source={require('../../assets/img_premium.png')}
						style={{ width: 85, height: 85, position: 'absolute', top: 0, marginLeft: 10 }} />
				</View>
				<View style={{ alignItems: 'center', marginTop: 40 }}>
					<View style={{ flexDirection: 'row', width: windowWidth * 0.7, marginBottom: 15 }}>
						<Image source={require('../../assets/img_menu_unlock.png')} style={{ width: 35, height: 35 }}></Image>
						<Text style={{ fontSize: 15, textAlign: 'left', textAlignVertical: 'center', paddingLeft: 20 }}>Tính năng gợi ý thực đơn</Text>
					</View>
					<View style={{ flexDirection: 'row', width: windowWidth * 0.7, marginBottom: 15 }}>
						<Image source={require('../../assets/img_scan_unlock.png')} style={{ width: 35, height: 35 }}></Image>
						<Text style={{ fontSize: 15, textAlign: 'left', textAlignVertical: 'center', paddingLeft: 20 }}>Scan thực phẩm</Text>
					</View>
					<View style={{ flexDirection: 'row', width: windowWidth * 0.7, marginBottom: 15 }}>
						<Image source={require('../../assets/img_food_unlock.png')} style={{ width: 35, height: 35 }}></Image>
						<Text style={{ fontSize: 15, textAlign: 'left', textAlignVertical: 'center', paddingLeft: 20 }}>Mở khóa tất cả món ăn</Text>
					</View>
				</View>
				<Divider backgroundColor={colors.blue}
					style={{ width: windowWidth * 0.6, alignSelf: 'center', marginVertical: 20 }}>
				</Divider>
				<View style={{ marginLeft: 40 }}>
					<Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>Chọn gói nâng cấp</Text>
					<RadioForm
						radio_props={upgradePack}
						onPress={handleRadioPress}
						selectedLabelColor={colors.blue}
						buttonSize={8}
						buttonOuterSize={20}
						borderWidth={1}
						labelStyle={{ fontSize: 16 }}
						radioStyle={{ paddingVertical: 5 }}
					/>
				</View>
				{showPaymentOptions && (
					<View style={styles.paymentOptions}>
						<TouchableOpacity
							style={[styles.card, selectedMethod === 'momo' && styles.selectedCard]}
							onPress={() => setSelectedMethod('momo')}
						>
							<Image source={require('../../assets/icon_momo.png')} style={styles.cardImage} />
							<Text style={styles.cardText}>Thanh toán bằng ví MoMo</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.card, selectedMethod === 'vnpay' && styles.selectedCard]}
							onPress={() => setSelectedMethod('vnpay')}
						>
							<Image source={require('../../assets/vnpay.png')} style={styles.cardImage} />
							<Text style={styles.cardText}>Thanh toán bằng ví VNPay</Text>
						</TouchableOpacity>
					</View>
				)}
				<Button title={showPaymentOptions ? 'Thanh toán' : 'Tiếp tục'}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: windowWidth * 0.9, height: 50, borderRadius: 10 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.blue, colors.lightBlue],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => {
						if (showPaymentOptions) {
							handlePayment();
						} else {
							handlePaymentOptions();
						}
					}}
				>
				</Button>
				<View style={{ paddingBottom: 150 }}></View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({

	container: {
		backgroundColor: colors.white,
		paddingTop: 20
	},
	btnClick: {
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 10,
	},
	loadingOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	loadingText: {
		marginTop: 10,
		color: colors.white,
		fontSize: 16,
	},
	paymentOptions: {
		marginTop: 10,
		alignItems: 'center',
	},
	card: {
		width: '90%', // Chiều rộng bằng với button THANH TOÁN
		alignSelf: 'center', // Căn giữa
		borderRadius: 10, // Bo góc
		borderWidth: 1, // Đường viền
		padding: 10, // Đệm bên trong
		marginBottom: 10, // Khoảng cách giữa các card
		flexDirection: 'row', // Sắp xếp theo chiều ngang
		alignItems: 'center', // Căn chỉnh các phần tử theo chiều dọc
	},
	cardImage: {
		width: 45, // Chiều rộng hình ảnh
		height: 45, // Chiều cao hình ảnh
		marginRight: 10, // Khoảng cách giữa hình ảnh và văn bản
	},
	cardText: {
		fontSize: 16, // Kích thước chữ
		fontWeight: '700', // Độ đậm của chữ
		marginLeft: 10, // Khoảng cách giữa hình ảnh và văn bản
	},
	selectedCard: {
		borderColor: colors.blue, // Màu viền khi được chọn
		transform: [{ scale: 1.03 }], // Tăng kích thước 5% khi được chọn
		shadowColor: colors.black, // Màu bóng
	},
})