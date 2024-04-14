import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { isEmail } from '../../utils/validation';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { handleCheckAccount } from '../../services/authenticate/check_account';
import { callOTPPassAPI } from '../../services/authenticate/required_otp';

export default function ForgotPassword({ navigation }) {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;

	const [email, setEmail] = React.useState("");


	const handleFotgotPassword = async (email) => {
		if (email === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập email.');
			return;
		} else if (!isEmail(email)) {
			Alert.alert('Thông báo', 'Email không hợp lệ.');
			return;
		} else {
			const response = await handleCheckAccount(email);
			if (response === true) {
				navigation.navigate('OTPForgotPassword');
				const result = await callOTPPassAPI(email);
				return;
			}
		}
	}
	return (
		<View style={{ alignItems: 'center', paddingTop: windowHeight / 5 }}>
			<Image source={require('../../assets/img_forgot_password.png')}
				style={{ width: 200, height: 200 }}>
			</Image>
			<Text style={styles.headingText}>Quên mật khẩu</Text>
			<Text style={[styles.infoText, { textAlign: 'center', lineHeight: 22 }]}>Mã OTP đặt lại mật khẩu sẽ được gửi đến email bạn đăng ký.</Text>

			<SafeAreaView style={[styles.inputFieldContainer, { marginTop: 30, marginBottom: 30 }]}>
				<Icon style={styles.iconBlue}
					name="email"
					type='fontisto'
					color={colors.blue}>
				</Icon>
				<TextInput style={styles.inputField}
					placeholder='Nhập email'
					onChangeText={setEmail}
					value={email}>
				</TextInput>
			</SafeAreaView>

			<Button title={"XÁC NHẬN"}
				style={styles.btnClick}
				titleStyle={{ fontWeight: '700', fontSize: 20 }}
				buttonStyle={{ minWidth: '95%', height: 42, borderRadius: 10 }}
				ViewComponent={LinearGradient}
				linearGradientProps={{
					colors: [colors.blue, colors.lightBlue],
					start: { x: 0, y: 0.5 },
					end: { x: 1, y: 0.5 },
				}}
				onPress={() => handleFotgotPassword(email)}>
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
	btnClick: {
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