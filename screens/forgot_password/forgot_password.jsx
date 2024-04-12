import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../colors';
import { otp_required_api } from '../../services/api_otp';
import { isEmail } from '../../utils/validation';
import { setAccessToken, setRefreshToken, getAccessToken, getRefreshToken, setEncrypted, getEncrypted } from '../../asyncStorage/auth';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function ForgotPassword({ navigation }) {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;

	const [email, setEmail] = React.useState("");

	const callOTPAPI = async (email) => {
		otp_required_api({ email: email, reset: 'true' })
			.then(response => {
				if (response.ok) {
					navigation.navigate('OtpPassword')
					return response.json().then(data => {
						encrypted = data.encrypted
						message = data.message
						accessToken = data.token['access_token']
						refreshToken = data.token['refresh_token']
						console.log(accessToken)
						setAccessToken(accessToken)
						setEncrypted(encrypted)
						useEffect(() => {
							getAccessToken()
						})
						Alert.alert("Thông báo", message)
						console.log(getAccessToken())
						console.log(getEncrypted())
						return true
					})
				} else {
					return response.json().then(data => {
						message = data.message
						Alert.alert('Thông báo', message)
						return false
					})
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	const handleFotgotPassword = async (email) => {
		if (email === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập email.');
			return;
		} else if (!isEmail(email)) {
			Alert.alert('Thông báo', 'Email không hợp lệ.');
			return;
		} else {
			callOTPAPI(email)
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