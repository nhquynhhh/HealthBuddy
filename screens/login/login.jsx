import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, ScrollView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { Component, useContext, useState } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../utils/colors'
import { handleLogin } from '../../services/authenticate/login'
import { AuthContext } from '../../context/AuthContext';
import { getAccessToken, getRefreshToken } from '../../asyncStorage/auth';
import { handleGetUserInfo } from '../../services/info/get_info';
import { handleGetAccountInfo } from '../../services/account/get_account_info';
import { handleGetDishList } from '../../services/dish/get_all_dishes';
import { handleGetAllIngredients } from '../../services/ingredients/get_all_ingredients';

export default function Login() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	const { storeAccessToken, storeRefreshToken, isLogged, setIsLogged, setUserInfo, setAccount, dishes, setDishes, ingredients, setIngredients, isLoggedWithPassword, setIsLoggedWithPassword } = useContext(AuthContext);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

	const login = async () => {
		if (email === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập email');
			return;
		}
		if (password === "") {
			Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu');
			return;
		}
		setIsLoggedWithPassword(true);
		const result = await handleLogin(email, password);
		if (result === true) {
			setIsLoggedWithPassword(false);
			const data = await handleGetUserInfo();
			if (data) {
				setUserInfo(data);
			}
			const accountInfo = await handleGetAccountInfo();
			if (accountInfo) {
				setAccount(accountInfo);
			}
			const dishList = await handleGetDishList();
			if (dishList) {
				setDishes(dishList);
			}
			const ingredientList = await handleGetAllIngredients();
			if (ingredientList) {
				setIngredients(ingredientList);
			}
			setIsLogged(true);
		}
		else {
			setIsLoggedWithPassword(false);
			setIsLogged(false);
			Alert.alert('Thông báo', 'Đăng nhập thất bại');
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'android' ? 'padding' : 'height'}
			style={[styles.container, { backgroundColor: colors.white }]}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
					<Image source={require('../../assets/img_bare_logo.png')}
						style={styles.loginLogo}
					/>
					<Text style={styles.headingText}>Đăng nhập</Text>
					<Text style={styles.infoText}>Đăng nhập để tiếp tục sử dụng app</Text>

					<SafeAreaView style={[styles.inputFieldContainer, { marginTop: 30 }]}>
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
					<SafeAreaView style={[styles.inputFieldContainer, { marginTop: 30 }]}>
						<Icon style={styles.iconBlue}
							name="lock-outline"
							type='material-community'
							color={colors.blue}>
						</Icon>
						<TextInput style={styles.inputField}
							placeholder='Nhập mật khẩu'
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
					<TouchableOpacity style={{ alignSelf: 'flex-end' }}
						onPress={() => navigation.navigate('ForgotPassword')}
					>
						<Text style={[{ color: colors.blue, marginTop: 15, marginRight: 15 }, styles.txtSmall]}>Quên mật khẩu?</Text>
					</TouchableOpacity>

					<Button title={"ĐĂNG NHẬP"}
						style={styles.btnClick}
						titleStyle={{ fontWeight: '700', fontSize: 20 }}
						buttonStyle={{ minWidth: '95%', height: 45, borderRadius: 10 }}
						ViewComponent={LinearGradient}
						linearGradientProps={{
							colors: [colors.blue, colors.lightBlue],
							start: { x: 0, y: 0.5 },
							end: { x: 1, y: 0.5 },
						}}
						onPress={() => login()}>

					</Button>

					<Divider style={{ marginTop: 30, height: 1, backgroundColor: colors.blue, width: windowWidth / 2 }}>
					</Divider>

					<View style={{ flexDirection: 'row', marginTop: 30 }}>
						<Text>Chưa có tài khoản? </Text>
						<TouchableOpacity
							onPress={() => navigation.navigate('Signup')}>
							<Text style={{ color: colors.blue, fontWeight: '600' }}>Đăng ký</Text>
						</TouchableOpacity>
					</View>

					<Image source={require('../../assets/img_login.png')}
						style={{ width: 210, height: 210, marginTop: 30 }}>
					</Image>

				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.2)'
	},
	loginLogo: {
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
		paddingTop: 50,
		flex: 1,
	},
	scrollView: {
	}


})