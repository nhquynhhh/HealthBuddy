import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert, Keyboard, ScrollView, ActivityIndicator } from 'react-native'
import React, { Component, useEffect, useState, useContext, useRef } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { OtpInput } from "react-native-otp-entry";
import { colors } from '../../utils/colors';
import { handleAuthenticatedAccount } from '../../services/authenticate/authenticated_account';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { callOTPPassAPI, callOTPAgainAPI } from '../../services/authenticate/required_otp';
import { is } from 'date-fns/locale';

export default function Activation() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const { isLogged, setLoginStatus } = useContext(AuthContext);
	const [otp, setOtp] = useState("");
	const navigation = useNavigation();
	const [timeLeft, setTimeLeft] = useState(300);
	const [isResend, setIsResend] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleOtpChange = (value) => {
		setOtp(value);
	};

	useEffect(() => {
		if (timeLeft === 0) return;

		const intervalId = setInterval(() => {
			setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timeLeft]);


	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};

	const handleActivation = async () => {
		console.log(otp);
		if (otp === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập mã OTP');
			return;
		}
		const result = await handleAuthenticatedAccount(otp);
		if (result === true) {
			navigation.navigate('GetData');
			Alert.alert('Thông báo', 'Kích hoạt thành công');
		}
		else {
			setLoginStatus(false);
			Alert.alert('Thông báo', 'Kích hoạt thất bại');
		}
	}

	const handleResend = async () => {

		if (timeLeft > 270) {
			Alert.alert('Thông báo', `Vui lòng chờ ${Math.round((timeLeft - 270))} giây nữa để yêu cầu mã OTP mới`);
			return;
		}

		setIsLoading(true);
		const response = await callOTPAgainAPI();
		if (response === true) {
			setTimeLeft(300);
			setIsLoading(false);
			Alert.alert('Thông báo', 'Mã OTP đã được gửi lại');
		}
		else {
			setIsLoading(false);
			Alert.alert('Thông báo', 'Gửi mã OTP thất bại');
		}
	}
	return (
		<ScrollView style={{ paddingTop: 30, backgroundColor: colors.white }}>
			<Image source={require('../../assets/img_email_verification.png')}
				style={{ width: 200, height: 200, alignSelf: 'center' }}></Image>
			<Text style={styles.headingText}>Kích hoạt tài khoản</Text>
			<Text style={[styles.infoText, { paddingVertical: 10 }]}>Mã OTP đã được gửi đến email đăng ký.</Text>
			<View style={{ width: '90%', paddingTop: 20, alignSelf: 'center' }}>
				{isLoading && <ActivityIndicator size="small" color={colors.gray} />}
				<OtpInput
					focusColor={colors.blue}
					value={otp}
					onTextChange={handleOtpChange}
					digits={6}
					style={{ backgroundColor: colors.white, borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, borderBottomWidth: 2 }}
					fontStyle={{ fontWeight: 'bold', color: colors.blue, fontSize: 20 }}>
				</OtpInput>
			</View>
			<View style={{ alignSelf: 'center', marginTop: 20, flexDirection: 'row' }}>
				<Text style={{ fontSize: 15 }}>Mã OTP có giá trị trong <Text style={{ fontWeight: 'bold' }}>{formatTime(timeLeft)}</Text></Text>
			</View>
			<View style={{ flexDirection: 'row', paddingTop: 5, alignSelf: 'center' }}>
				<Text style={{ fontSize: 15 }}>Chưa nhận được OTP? </Text>
				{(!isLoading) && (
					<TouchableOpacity onPress={handleResend}>
						<Text style={{ color: colors.blue, fontWeight: 'bold', fontSize: 15 }}>Gửi lại.</Text>
					</TouchableOpacity>
				)}
				{isLoading && (
					<Text style={{ color: colors.gray, fontWeight: 'bold', fontSize: 15 }}>Đang gửi lại...</Text>
				)}
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
			<View style={{ marginBottom: 250 }}></View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	headingText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
		color: colors.black,
		alignSelf: 'center'
	},
	infoText: {
		color: colors.darkGray,
		marginTop: 5,
		alignSelf: 'center'
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
		alignItems: 'center',
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