import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component, useContext, useState } from 'react'
import { SearchBar, Icon, Divider, Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { DataTable, Modal } from 'react-native-paper';
import { colors } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';
import { removeAccessTokenAsync, removeRefreshTokenAsync } from '../../asyncStorage/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioForm from 'react-native-simple-radio-button';

export default function Personal() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();

	const { removeAccessToken, removeRefreshToken, isLogged, setIsLogged, userInfo, account, setUserInfo, setAccount} = useContext(AuthContext);

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
	const onPressHandler = () => {
		setIsFormVisible(true);
	}
	const closeModal = () => {
		setIsFormVisible(false);
	}
	const accountType = account.has_subscription ? "PREMIUM" : "STANDARD";
	const gender = userInfo.gender == 'male' ? 'Nam' : 'Nữ';
	const target = [
		{ label: 'Giảm cân', value: 0 },
		{ label: 'Duy trì cân nặng', value: 1 },
		{ label: 'Tăng cân', value: 2 }
	]
	return (
		<SafeAreaView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
		<ScrollView >
			<View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
				<View style={{ padding: 10 }}>
					<Image source={require('../../assets/img_avatar.png')} style={{ width: 60, height: 60, alignSelf: 'center' }}></Image>
				</View>
				<View style={[styles.verticalLine, { marginRight: 15, marginLeft: 5 }]}></View>
				<View style={{ flex: 1 }}>
					<Text style={{ fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2 }}>{userInfo.username}</Text>
					<Text style={{ marginVertical: 2, fontSize: RFValue(14, 720) }}>UserID: <Text style={{ fontWeight: 'bold', }}>123456789</Text></Text>
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
				<Text style={{ marginVertical: 10, fontSize: RFValue(14, 720) }}>{userInfo.aim}</Text>
				<Text style={{ fontSize: RFValue(14, 720) }}>Cân nặng mong muốn: <Text style={{ fontWeight: 'bold' }}>55kg</Text></Text>
			</View>
			<View style={{ padding: 15, borderWidth: 1.5, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 10, borderColor: colors.blue, marginVertical: 5 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ fontWeight: 'bold', fontSize: RFValue(15, 720) }}>Thông tin cá nhân</Text>
					<TouchableOpacity>
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
							<DataTable.Cell style={styles.tableContent}>{userInfo.age}</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell style={styles.tableHeader}>Chiều cao</DataTable.Cell>
							<DataTable.Cell style={styles.tableContent}>{userInfo.height} cm</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row>
							<DataTable.Cell style={styles.tableHeader}>Cân nặng</DataTable.Cell>
							<DataTable.Cell style={styles.tableContent}>{userInfo.weight} kg</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
				</View>
			</View>
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

			</TouchableOpacity>
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
			<View style={{ paddingBottom: 70 }}></View>

		
		</ScrollView>
		{/* Modal */}
			<Modal
				visible={isFormVisible}
				animationType="slide"
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<View style={[styles.modalContent,{width:windowWidth*0.9}]}>
						<TouchableOpacity onPress={closeModal} style={{ position: "absolute", top: 8, right: 8, zIndex: 1}}>
							<Icon 
								name="close" 
								type="antdesign" 
								size={25} 
								color={colors.red} 
							/>
						</TouchableOpacity>
						<View style={{ padding: 20, justifyContent: 'flex-start'}}>
							<Text style={{ fontWeight: 'bold', fontSize: RFValue(20, 720) }}>Mục tiêu của bạn</Text>
						</View>
						<RadioForm
							radio_props={target}
							onPress={value => {
								const selectedLabel = target.find(item => item.value === value)?.label;
							}}
							selectedLabelColor={colors.blue}
							buttonSize={8}
							buttonOuterSize={20}
							borderWidth={1}
							labelStyle={{ fontSize: 16, lineHeight: 30}}
							style={{paddingLeft: 30}}
						/>
						<Text style={{ fontWeight: 'bold',fontSize: RFValue(20, 720), padding: 20 }}>Cân nặng mong muốn</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingBottom: 20}}>
							<TextInput 
								style={[styles.inputField, { paddingLeft: 20,paddingRight: 20,  borderColor: colors.blue, borderWidth: 1, borderRadius: 10 }]}
								placeholder='Cân nặng'
								keyboardType='numeric'
							/>
							<View style={{ marginLeft: 10 }}>
								<Text style={{fontSize: RFValue(20, 720) }}>kg</Text>
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
							onPress={closeModal}>
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
