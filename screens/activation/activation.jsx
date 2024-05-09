import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert, Keyboard } from 'react-native'
import React, { Component, useEffect, useState, useContext, useRef } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';

import { OtpInput } from "react-native-otp-entry";

import { colors } from '../../utils/colors';
import { handleAuthenticatedAccount } from '../../services/authenticate/authenticated_account';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function Activation() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const { isLogged, setLoginStatus } = useContext(AuthContext);
	const [otp, setOtp] = React.useState('');
	const navigation = useNavigation();


	const handleActivation = async () => {
		if (otp === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập mã OTP');
			return;
		}
		console.log(otp);
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
	return (
		<View style={{ alignItems: 'center', paddingTop: 100, backgroundColor: colors.white }}>
			<Image source={require('../../assets/img_email_verification.png')}
				style={{ width: 200, height: 200 }}></Image>
			<Text style={styles.headingText}>Kích hoạt tài khoản</Text>
			<Text style={[styles.infoText, { paddingVertical: 10 }]}>Mã OTP đã được gửi đến email đăng ký.</Text>
			<View style={{ width: '90%', paddingTop: 20 }}>
				<OtpInput
					autoFocus={true}
					otp={otp}
					onTextChange={setOtp}
					numberOfInputs={6}
					tintColor={colors.blue}
					offTintColor={colors.gray}
					secureTextEntry={false}
					keyboardType="numeric"
				/>

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