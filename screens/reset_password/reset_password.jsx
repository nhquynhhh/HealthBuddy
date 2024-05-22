import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert, ScrollView } from 'react-native'
import React, { Component, useEffect, useState, useContext } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors';
import { handleResetPassword } from '../../services/authenticate/reset_password'
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
export default function ResetPassword() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const { isLogged, setLoginStatus } = useContext(AuthContext);
	const navigation = useNavigation();
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");
	const [passwordIsVisible, setPasswordIsVisible] =
		React.useState(false);

	const [passwordConfirmIsVisible, setPasswordConfirmIsVisible] =
		React.useState(false);

	const handleChangePassword = async () => {
		if (password === "" || passwordConfirm === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu.');
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
			const result = await handleResetPassword(password);
			if (result === true) {
				setLoginStatus(true);
				Alert.alert('Thông báo', 'Đặt lại mật khẩu thành công.');
			}
			else {
				navigation.navigate('Login');
				Alert.alert('Thông báo', 'Đặt lại mật khẩu thất bại.');
			}
		}
	}

	return (
		<ScrollView style={{ backgroundColor: colors.white, flexShrink: 1, height: '100%' }}>
			<View style={{ alignItems: 'center', paddingTop: 80 }}>
				<Image source={require('../../assets/img_reset_password.png')}
					style={{ width: 250, height: 250 }}>
				</Image>
				<Text style={styles.headingText}>Đặt lại mật khẩu</Text>
				<Text style={[styles.infoText, { textAlign: 'center', lineHeight: 22 }]}>Đặt mật khẩu mới cho tài khoản của bạn.</Text>

				<Text style={[styles.describeText, { marginTop: 30 }]}>Nhập mật khẩu mới</Text>
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

				<Button title={"XÁC NHẬN"}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: '95%', height: 42, borderRadius: 10, marginTop: 15 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.blue, colors.lightBlue],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => handleChangePassword()}>
				</Button>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	headingText: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 0,
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
	passwordVisibleButton: {
		position: "absolute",
		right: 0,
		paddingLeft: 10,
		paddingRight: 10
	},
	inputField: {
		fontSize: 15,
		width: "80%"
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
		marginTop: 15,
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