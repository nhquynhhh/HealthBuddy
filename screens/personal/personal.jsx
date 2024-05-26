import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, TextInput, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SearchBar, Icon, Divider, Input, Button } from 'react-native-elements';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { DataTable, Modal, RadioButton } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';
import { removeAccessTokenAsync, removeRefreshTokenAsync } from '../../asyncStorage/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioForm from 'react-native-simple-radio-button';
import { handleGetUserInfo } from '../../services/info/get_info';

export default function Personal() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const [expiredDate, setExpiredDate] = useState('');
	const { removeAccessToken, removeRefreshToken, isLogged, setIsLogged, userInfo, account, setUserInfo, setAccount } = useContext(AuthContext);

	const [refresh, setRefresh] = useState(false);

	const logout = () => {
		setIsLogged(false);
		removeAccessToken();
		removeRefreshToken();
		removeAccessTokenAsync()
		removeRefreshTokenAsync();
		removeAccessTokenAsync();
		removeRefreshTokenAsync();
		console.log("Logout");
	}
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const onPressHandler = () => {
		setIsFormVisible(true);
	}
	const closeModal = () => {
		setIsFormVisible(false);
	}
	const onPressHandler2 = () => {
		setIsModalVisible(true);
	}
	const closeModal2 = () => {
		setIsModalVisible(false);
	}
	const [accountType, setAccountType] = useState(userInfo.has_subscription ? "PREMIUM" : "STANDARD");
	const [checked, setChecked] = useState(userInfo.gender);
	const [gender, setGender] = useState(userInfo.gender == 'male' ? 'Nam' : 'Nữ');

	const [age, setAge] = useState(userInfo.age);
	const [height, setHeight] = useState(userInfo.height);
	const [weight, setWeight] = useState(userInfo.weight);
	const [targetSelected, setTargetSelected] = useState(userInfo.aim);
	const [targetLabel, setTargetLabel] = useState(userInfo.aim);

	const [tempAge, setTempAge] = useState(userInfo.age);
	const [tempHeight, setTempHeight] = useState(userInfo.height);
	const [tempWeight, setTempWeight] = useState(userInfo.weight);

	const target = [
		{ label: 'Giảm cân', value: 0 },
		{ label: 'Duy trì cân nặng', value: 1 },
		{ label: 'Tăng cân', value: 2 }
	]
	const loadData = async () => {
		setAge(userInfo.age);
		setHeight(userInfo.height);
		setWeight(userInfo.weight);
		setTargetSelected(userInfo.aim);
		setGender(userInfo.gender == 'male' ? 'Nam' : 'Nữ')
		const response = await handleGetUserInfo();
		if (response) {
			setAccountType(response.has_subscription ? "PREMIUM" : "STANDARD");
			const date = new Date(response.expired_date);
			const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
			const formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(date);
			setExpiredDate(formattedDate);
		}
	}

	const updateInfoFromTemp = () => {
		setTargetSelected(targetLabel);
		setAge(tempAge);
		setHeight(tempHeight);
		setWeight(tempWeight);
		setGender(checked);
	}

	const updateUserInfo = async () => {
		userInfo.age = age;
		userInfo.height = height;
		userInfo.weight = weight;
		userInfo.aim = targetSelected;
		userInfo.gender = checked;
		setUserInfo(userInfo);
		loadData();
	}

	useEffect(() => {
		loadData();
		console.log(userInfo);
	}, [])

	// useEffect(() => {
	// 	if (isFocused) {
	// 		console.log(account.has_subscription ? "PREMIUM" : "STANDARD");
	// 		console.log(userInfo);
	// 	}
	// }, [isFocused]);

	const onRefresh = () => {
		setRefresh(true);
		loadData();
		setRefresh(false);

	}

	useEffect(() => {
		setTargetSelected(targetLabel);
	}, [targetSelected])

	return (
		<SafeAreaView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
			<ScrollView refreshControl={
				<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>
			} >
				<View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
					<View style={{ padding: 10 }}>
						<Image source={require('../../assets/img_avatar.png')} style={{ width: 60, height: 60, alignSelf: 'center' }}></Image>
					</View>
					<View style={[styles.verticalLine, { marginRight: 15, marginLeft: 5 }]}></View>
					<View style={{ flex: 1 }}>
						<Text style={{ fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2 }}>{userInfo.username}</Text>
						<Text style={{ marginVertical: 2, fontSize: RFValue(14, 720) }}>UserID: <Text style={{ fontWeight: 'bold', }}>{account.account_id}</Text></Text>
						<Text style={{ marginVertical: 2, fontSize: RFValue(14, 720) }}>Loại tài khoản: <Text style={{ fontWeight: 'bold' }}>{accountType}</Text></Text>
					</View>
				</View>
				<View style={{ padding: 15, borderWidth: 1.5, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 10, borderColor: colors.blue, marginVertical: 20 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ fontWeight: 'bold', fontSize: RFValue(15, 720) }}>Mục tiêu của bạn</Text>
						<TouchableOpacity onPress={onPressHandler}>
							<Text style={{ fontWeight: 'bold', fontSize: RFValue(14, 720), color: colors.blue }}>Thay đổi</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ marginVertical: 10, fontSize: RFValue(14, 720) }}>{targetSelected}</Text>
					<Text style={{ fontSize: RFValue(14, 720) }}>Cân nặng mong muốn: <Text style={{ fontWeight: 'bold' }}>55kg</Text></Text>
				</View>
				<View style={{ padding: 15, borderWidth: 1.5, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 10, borderColor: colors.blue, marginVertical: 5 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={{ fontWeight: 'bold', fontSize: RFValue(15, 720) }}>Thông tin cá nhân</Text>
						<TouchableOpacity onPress={onPressHandler2}>
							<Text style={{ fontWeight: 'bold', fontSize: RFValue(14, 720), color: colors.blue }}>Thay đổi</Text>
						</TouchableOpacity>
					</View>
					<View>
						<DataTable>
							<DataTable.Row>
								<DataTable.Cell style={styles.tableHeader}>Tên người dùng</DataTable.Cell>
								<DataTable.Cell style={styles.tableContent}>{userInfo.username}</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell style={styles.tableHeader}>Giới tính</DataTable.Cell>
								<DataTable.Cell style={styles.tableContent}>{gender}</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell style={styles.tableHeader}>Tuổi</DataTable.Cell>
								<DataTable.Cell style={styles.tableContent}>{age}</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell style={styles.tableHeader}>Chiều cao</DataTable.Cell>
								<DataTable.Cell style={styles.tableContent}>{height} cm</DataTable.Cell>
							</DataTable.Row>
							<DataTable.Row>
								<DataTable.Cell style={styles.tableHeader}>Cân nặng</DataTable.Cell>
								<DataTable.Cell style={styles.tableContent}>{weight} kg</DataTable.Cell>
							</DataTable.Row>
						</DataTable>
					</View>
				</View>

				{accountType === "STANDARD" ?
					<TouchableOpacity style={{ padding: 15, width: windowWidth * 0.9, alignSelf: 'center' }} onPress={() => { navigation.navigate('Premium') }}>
						<View style={{ alignItems: 'center' }}>
							<LinearGradient
								colors={[colors.blue, colors.lightBlue]}
								start={{ x: 0, y: 0.5 }}
								end={{ x: 1, y: 0.5 }}
								style={{ borderRadius: 15, padding: 10, width: windowWidth * 0.9, marginTop: 5, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
								<Image source={require('../../assets/img_premium.png')} style={{ width: 60, height: 60, marginRight: 20, marginLeft: 15 }}></Image>
								<Text style={{ color: colors.white, textAlign: 'left', lineHeight: 25 }}>
									<Text style={{ fontWeight: 'bold', fontSize: RFValue(15, 720) }}>Nâng cấp tài khoản PREMIUM{"\n"}</Text>
									<Text style={{ fontStyle: 'italic' }}>
										chỉ từ 50.000₫ / tháng {"\n"}
										để trải nghiệm tiện ích
										<Text style={{ fontWeight: 'bold' }}> không giới hạn</Text>
									</Text>
								</Text>
							</LinearGradient>
						</View>
					</TouchableOpacity> :
					<View style={{ alignItems: 'center' }}>
						<LinearGradient
							colors={[colors.blue, colors.lightBlue]}
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							style={{ borderRadius: 15, padding: 10, width: windowWidth * 0.9, marginTop: 5, alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
							<Image source={require('../../assets/img_premium.png')} style={{ width: 60, height: 60, marginRight: 20, marginLeft: 15 }}></Image>
							<Text style={{ color: colors.white, textAlign: 'left', lineHeight: 25 }}>
								<Text style={{ fontWeight: 'bold', fontSize: RFValue(14, 720) }}>Thành viên PREMIUM{"\n"}</Text>
								<Text style={{ fontStyle: 'italic' }}>
									Tài khoản hết hạn vào ngày 
									<Text style={{ fontWeight: 'bold' }}> {expiredDate} {"\n"}</Text>
								</Text>
							</Text>
						</LinearGradient>
					</View>
				}
				<Divider style={{ marginVertical: 15, height: 1, backgroundColor: colors.blue, width: windowWidth / 2, alignSelf: 'center' }}>
				</Divider>
				<Button title={"  ĐĂNG XUẤT"}
					icon={{ name: 'logout', type: 'antdesign', color: colors.white, size: 20 }}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: '95%', height: 42, borderRadius: 10 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.red, colors.red],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => logout()}>
				</Button>
				<View style={{ paddingBottom: 70 }}>

				</View>
			</ScrollView>
			{/* Modal 1 */}
			<Modal
				visible={isFormVisible}
				animationType="slide"
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<View style={[styles.modalContent, { width: windowWidth * 0.9 }]}>
						<TouchableOpacity onPress={closeModal} style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
							<Icon
								name="close"
								type="antdesign"
								size={25}
								color={colors.red}
							/>
						</TouchableOpacity>
						<View style={{ padding: 20, justifyContent: 'flex-start' }}>
							<Text style={{ fontWeight: 'bold', fontSize: RFValue(20, 720) }}>Mục tiêu của bạn</Text>
						</View>
						<RadioForm
							radio_props={target}
							onPress={value => {
								setTargetLabel(target.find(item => item.value === value)?.label);
							}}
							selectedLabelColor={colors.blue}
							buttonSize={8}
							buttonOuterSize={20}
							borderWidth={1}
							labelStyle={{ fontSize: 16, lineHeight: 30 }}
							style={{ paddingLeft: 30 }}
							status={targetLabel}
						/>
						<Text style={{ fontWeight: 'bold', fontSize: RFValue(20, 720), padding: 20 }}>Cân nặng mong muốn</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingBottom: 20 }}>
							<TextInput
								style={[styles.inputField, { paddingLeft: 20, paddingRight: 20, borderColor: colors.blue, borderWidth: 1, borderRadius: 10 }]}
								placeholder='Cân nặng'
								keyboardType='numeric'
							/>
							<View style={{ marginLeft: 10 }}>
								<Text style={{ fontSize: RFValue(20, 720) }}>kg</Text>
							</View>
						</View>
						<Button title={"XÁC NHẬN"}
							style={styles.btnClick}
							titleStyle={{ fontWeight: '700', fontSize: 20 }}
							buttonStyle={{ minWidth: '70%', height: 45, borderRadius: 10 }}
							ViewComponent={LinearGradient}
							linearGradientProps={{
								colors: [colors.blue, colors.lightBlue],
								start: { x: 0, y: 0.5 },
								end: { x: 1, y: 0.5 },
							}}
							onPress={() => {
								closeModal();

								updateUserInfo();
							}}>
						</Button>
					</View>
				</View>
			</Modal>


			<Modal
				visible={isModalVisible}
				animationType="slide"
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<View style={[styles.modalContent, { width: windowWidth * 0.9 }]}>
						<TouchableOpacity onPress={closeModal2} style={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
							<Icon
								name="close"
								type="antdesign"
								size={25}
								color={colors.red}
							/>
						</TouchableOpacity>
						<View style={{ padding: 20, justifyContent: 'flex-start', justifyContent: "center", alignItems: "center" }}>
							<Text style={{ fontWeight: 'bold', fontSize: RFValue(20, 720) }}>Thông tin cá nhân</Text>
						</View>

						<View style={{ marginBottom: 20 }}>
							<DataTable>
								<DataTable.Row>
									<DataTable.Cell style={styles.tableHeader}>Tên người dùng</DataTable.Cell>
									<DataTable.Cell style={styles.tableContent}>
										<TextInput
											style={[styles.inputField, { paddingLeft: 15, paddingRight: 15, width: "100%", borderColor: colors.blue, borderWidth: 1, borderRadius: 10 }]}
											placeholder='Họ tên'
											keyboardType='text'
											value={userInfo.username}
											editable={false}
										/>
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell style={styles.tableHeader}>Giới tính</DataTable.Cell>
									<DataTable.Cell style={styles.tableContent}>
										<View style={{ justifyContent: 'center', flexDirection: 'row' }}>
											<RadioButton
												value="male"
												color={colors.blue}
												status={checked === 'male' ? 'checked' : 'unchecked'}
												onPress={() => setChecked('male')}
											/>
											<TouchableOpacity
												style={{ justifyContent: 'center', alignContent: 'center' }}
												onPress={() => setChecked('male')}>
												<Text style={checked == 'male' ? { color: colors.blue } : { color: colors.black }}>Nam</Text>
											</TouchableOpacity>
											<RadioButton
												value="female"
												color={colors.red}
												status={checked === 'female' ? 'checked' : 'unchecked'}
												onPress={() => setChecked('female')}
											/>
											<TouchableOpacity
												style={{ justifyContent: 'center', alignContent: 'center' }}
												onPress={() => setChecked('female')}>
												<Text style={checked == 'female' ? { color: colors.red } : { color: colors.black }}>Nữ</Text>
											</TouchableOpacity>
										</View>

									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell style={styles.tableHeader}>Tuổi</DataTable.Cell>
									<DataTable.Cell style={styles.tableContent}>
										<TextInput
											style={[styles.inputField, { paddingLeft: 15, paddingRight: 15, width: "100%", borderColor: colors.blue, borderWidth: 1, borderRadius: 10 }]}
											placeholder='Tuổi'
											keyboardType='numeric'
											value={tempAge.toString()}
											onChangeText={text => {
												const numericValue = parseInt(text);
												setTempAge(isNaN(numericValue) ? '' : numericValue); // Đảm bảo chỉ có số mới được chấp nhận
											}}
										/>
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell style={styles.tableHeader}>Chiều cao</DataTable.Cell>
									<DataTable.Cell style={styles.tableContent}>
										<TextInput
											style={[styles.inputField, { paddingLeft: 15, paddingRight: 15, width: "100%", borderColor: colors.blue, borderWidth: 1, borderRadius: 10 }]}
											placeholder='Chiều cao(cm)'
											keyboardType='numeric'
											value={tempHeight.toString()}
											onChangeText={text => {
												const numericValue = parseInt(text);
												setTempHeight(isNaN(numericValue) ? '' : numericValue); // Đảm bảo chỉ có số mới được chấp nhận
											}
											}
										/>
									</DataTable.Cell>
								</DataTable.Row>
								<DataTable.Row>
									<DataTable.Cell style={styles.tableHeader}>Cân nặng</DataTable.Cell>
									<DataTable.Cell style={styles.tableContent}>
										<TextInput
											style={[styles.inputField, { paddingLeft: 15, paddingRight: 15, width: "100%", borderColor: colors.blue, borderWidth: 1, borderRadius: 10 }]}
											placeholder='Cân nặng(kg)'
											keyboardType='numeric'
											value={tempWeight.toString()}
											onChangeText={text => {
												const numericValue = parseInt(text);
												setTempWeight(isNaN(numericValue) ? '' : numericValue); // Đảm bảo chỉ có số mới được chấp nhận
											}
											}
										/>
									</DataTable.Cell>
								</DataTable.Row>
							</DataTable>
						</View>
						<Button title={"XÁC NHẬN"}
							style={styles.btnClick}
							titleStyle={{ fontWeight: '700', fontSize: 20 }}
							buttonStyle={{ minWidth: '70%', height: 45, borderRadius: 10 }}
							ViewComponent={LinearGradient}
							linearGradientProps={{
								colors: [colors.blue, colors.lightBlue],
								start: { x: 0, y: 0.5 },
								end: { x: 1, y: 0.5 },
							}}
							onPress={
								() => {
									updateUserInfo();
									updateInfoFromTemp();
									closeModal2();
								}
							}>
						</Button>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	verticalLine: {
		height: '100%',
		width: 1,
		backgroundColor: colors.gray,
	},
	tableHeader: {
		fontWeight: '700',
		fontSize: RFValue(14, 720),
	},
	tableContent: {
		fontSize: RFValue(14, 720),
	},
	btnClick: {
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	modalContent: {
		backgroundColor: colors.white,
		borderRadius: 10,
		padding: 20,
		borderColor: colors.lightBlue,
		borderWidth: 5,
		borderRadius: 10,

	}
})
