import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert, ScrollView } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { isEmail } from '../../utils/validation';
import { signup } from '../../services/authenticate/signup';
import { useNavigation } from '@react-navigation/native';
import { handleCheckAccount } from '../../services/authenticate/check_account';

export default function Signup() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();

	const [email, setEmail] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");

	const [passwordIsVisible, setPasswordIsVisible] =
		React.useState(false);

	const [passwordConfirmIsVisible, setPasswordConfirmIsVisible] =
		React.useState(false);

	const handleSignUp = async () => {
		if (username === "" || email === "" || password === "" || passwordConfirm === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
			return;
		}
		else if (!isEmail(email)) {
			Alert.alert('Thông báo', 'Email không hợp lệ.');
			return;
		}
		else if (password !== passwordConfirm) {
			Alert.alert('Thông báo', 'Mật khẩu xác nhận không khớp.');
			return;
		}
		else if (password.length < 8 || passwordConfirm.length < 8) {
			Alert.alert('Thông báo', 'Mật khẩu phải chứa ít nhất 8 ký tự.');
			return;
		}
		else {
			const check = await handleCheckAccount(email);
			if (check === true) {
				Alert.alert('Thông báo', 'Email đã được sử dụng.');
				return;
			} else {
				navigation.navigate('Activation');
				Alert.alert('Thông báo', 'Đăng ký thành công.');
				await signup({ username: username, email: email, password: password })
			}
		}
	}
	return (
		<ScrollView style={{ backgroundColor: colors.white, flexShrink: 1, height: '100%' }}>
			<View style={[{ alignItems: 'center', backgroundColor: colors.white, height: '100%' }, styles.container]}>
				<Image source={require('../../assets/img_bare_logo.png')}
					style={styles.signupLogo}
				/>
				<Text style={styles.headingText}>Đăng ký</Text>
				<Text style={styles.infoText}>Nhập thông tin của bạn</Text>

				<Text style={styles.describeText}>Tên của bạn</Text>
				<SafeAreaView style={styles.inputFieldContainer}>
					<Icon style={styles.iconBlue}
						name="person-outline"
						type='ionicon'
						color={colors.blue}>
					</Icon>
					<TextInput style={styles.inputField}
						placeholder='Nhập tên người dùng'
						maxLength={20}
						onChangeText={(username) => {
							if (username.length >= 20) {
								Alert.alert('Thông báo', 'Tên người dùng không được quá 20 ký tự.');
							} else {
								setUsername(username);
							}
						}}
						value={username}>
					</TextInput>
				</SafeAreaView>

				<Text style={styles.describeText}>Email</Text>
				<SafeAreaView style={styles.inputFieldContainer}>
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

				<Text style={styles.describeText}>Nhập mật khẩu</Text>
				<SafeAreaView style={styles.inputFieldContainer}>
					<Icon style={styles.iconBlue}
						name="lock-outline"
						type='material-community'
						color={colors.blue}>
					</Icon>
					<TextInput style={styles.inputField}
						placeholder='Nhập mật khẩu'
						maxLength={20}
						onChangeText={setPassword}
						value={password}
						secureTextEntry={!passwordIsVisible}>
					</TextInput>
					<TouchableOpacity
						style={styles.passwordVisibleButton}
						onPress={() => setPasswordIsVisible(!passwordIsVisible)}
					>
						<Icon
							name={passwordIsVisible ? "eye-outline" : "eye-off-outline"}
							size={24}
							color={colors.blue}
							type='ionicon'
						/>
					</TouchableOpacity>
				</SafeAreaView>

				<Text style={styles.describeText}>Xác nhận mật khẩu</Text>
				<SafeAreaView style={styles.inputFieldContainer}>
					<Icon style={styles.iconBlue}
						name="lock-outline"
						type='material-community'
						color={colors.blue}>
					</Icon>
					<TextInput style={styles.inputField}
						placeholder='Xác nhận mật khẩu'
						onChangeText={setPasswordConfirm}
						value={passwordConfirm}
						secureTextEntry={!passwordConfirmIsVisible}>
					</TextInput>
					<TouchableOpacity
						style={styles.passwordVisibleButton}
						onPress={() => setPasswordConfirmIsVisible(!passwordConfirmIsVisible)}
					>
						<Icon
							name={passwordConfirmIsVisible ? "eye-outline" : "eye-off-outline"}
							size={24}
							color={colors.blue}
							type='ionicon'
						/>
					</TouchableOpacity>
				</SafeAreaView>

				<Button title={"ĐĂNG KÝ"}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: '95%', height: 42, borderRadius: 10, marginTop: 15 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.blue, colors.lightBlue],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => handleSignUp()}>
				</Button>

				<Divider style={{ marginTop: 30, height: 1, backgroundColor: colors.blue, width: windowWidth / 2 }}>
				</Divider>

				<View style={{ flexDirection: 'row', marginTop: 30 }}>
					<Text>Đã có tài khoản? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Login')}>
						<Text style={{ color: colors.blue, fontWeight: '600' }}>Đăng nhập</Text>
					</TouchableOpacity>
				</View>

				<View style={{height: 50}}></View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	signupLogo: {
		width: 75,
		height: 75
	},
	headingText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
		color: colors.blue
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
		width: '80%',
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