import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native'
import React, { Component, useEffect, useState, useContext } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import OtpTextInput from 'react-native-text-input-otp'
import { colors } from '../../utils/colors';
import { handleAuthenticatedAccount } from '../../services/authenticate/authenticated_account';
import { AuthContext } from '../../context/AuthContext';


export default function Activation() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const { isLogged, setLoginStatus } = useContext(AuthContext);
	const [otp, setOtp] = React.useState('');

	const handleActivation = async () => {
		if (otp === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập mã OTP');
			return;
		}
		const result = await handleAuthenticatedAccount(otp);
		if (result === true) {
			setLoginStatus(true);
			Alert.alert('Thông báo', 'Kích hoạt thành công');
		}
		else {
			setLoginStatus(false);
			Alert.alert('Thông báo', 'Kích hoạt thất bại');
		}
	}

	return (
		<View style={{ alignItems: 'center', paddingTop: 100 }}>
			<Image source={require('../../assets/img_email_verification.png')}
				style={{ width: 200, height: 200 }}></Image>
			<Text style={styles.headingText}>Kích hoạt tài khoản</Text>
			<Text style={[styles.infoText, { paddingVertical: 10 }]}>Mã OTP đã được gửi đến email đăng ký.</Text>
			<View style={{ width: '90%', paddingTop: 20 }}>
				<OtpTextInput
					otp={otp}
					setOtp={setOtp}
					digits={6}
					style={{ backgroundColor: colors.white, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomWidth: 2 }}
					fontStyle={{ fontWeight: 'bold', color: colors.blue, fontSize: 20 }}>
				</OtpTextInput>
			</View>

			<View style={{ flexDirection: 'row', paddingTop: 30 }}>
				<Text style={{ fontSize: 15 }}>Chưa nhận được OTP? </Text>
				<TouchableOpacity>
					<Text style={{ color: colors.blue, fontWeight: 'bold', fontSize: 15 }}>Gửi lại.</Text>
				</TouchableOpacity>
			</View>

			<Button title={"KÍCH HOẠT"}
				style={styles.btnClick}
				titleStyle={{ fontWeight: '700', fontSize: 20 }}
				buttonStyle={{ minWidth: '95%', height: 45, borderRadius: 10, marginTop: 15 }}
				ViewComponent={LinearGradient}
				linearGradientProps={{
					colors: [colors.blue, colors.lightBlue],
					start: { x: 0, y: 0.5 },
					end: { x: 1, y: 0.5 },
				}}
				onPress={() => handleActivation()}>
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	headingText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
		color: colors.black
	},
	infoText: {
		color: colors.darkGray,
		marginTop: 5,
	},
	inputFieldContainer: {
		backgroundColor: colors.white,
		maxWidth: '90%',
		minWidth: '90%',
		borderColor: colors.blue,
		borderWidth: 1,
		borderRadius: 10,
		height: 42,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputField: {
		fontSize: 15,
	},
	iconBlue: {
		color: colors.blue,
		fontSize: 24,
		paddingLeft: 10,
		paddingRight: 10
	},
	passwordVisibleButton: {
		position: "absolute",
		right: 0,
		paddingLeft: 10,
		paddingRight: 10
	},
	txtSmall: {
		fontSize: 15
	},
	btnClick: {
		paddingTop: 15,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: 70
	},
	describeText: {
		color: colors.black,
		fontSize: 17,
		fontWeight: 'bold',
		textAlign: 'left',
		alignSelf: 'flex-start',
		marginLeft: 25,
		marginVertical: 14
	}
})