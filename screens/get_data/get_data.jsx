import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions, Alert } from 'react-native'
import React, { Component, useEffect, useState, useMemo, useContext } from 'react'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import RadioForm from 'react-native-simple-radio-button';
import { colors } from '../../utils/colors';
import { handleUpdateUserInfo } from '../../services/info/update_info';
import { AuthContext } from '../../context/AuthContext';
import {FoodList} from '../food_list/food_list';

export default function GetData() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const {isLogged, setLoginStatus, userInfo, setUserInfo} = useContext(AuthContext);

	const target = [
		{ label: 'Giảm cân', value: 0 },
		{ label: 'Duy trì cân nặng', value: 1 },
		{ label: 'Tăng cân', value: 2 }
	]

	const [currentPage, setCurrentPage] = useState('page1');
	const [currentPageNav, setCurrentPageNav] = useState('page1Nav');

	const [selectedGender, setSelectedGender] = useState('male');
	const [age, setAge] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [targetSelected, setTargetSelected] = useState('Giảm cân');

	const handleContinuePage2 = () => {
		if (age === '' || height === '' || weight === '') {
			Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin.');
			return;
		}  else if (isNaN(age) || isNaN(height) || isNaN(weight)) {
			Alert.alert('Thông báo', 'Tuổi, chiều cao và cân nặng phải là số');
			return;
		} else if (age <= 0 || height <= 0 || weight <= 0){
			Alert.alert('Thông báo', 'Thông tin đã nhập không hợp lệ. Tuổi, chiều cao và cân nặng phải lớn hơn 0');
			return;
		} else if (age < 18 || height < 100 || weight < 30 || height > 250 || weight > 200) {
			Alert.alert('Thông báo', 'Thông tin đã nhập không hợp lệ. Tuổi phải lớn hơn 18, chiều cao phải lớn hơn 100 và cân nặng phải từ 30 đến 200 kg');
			return; 
		} else {
			setCurrentPage('page3');
			setCurrentPageNav('page3Nav');
		}
	}

	const handleUpdateUser = async () => {
		const props = {
			age: age,
			weight: weight,
			height: height,
			aim: targetSelected,
			gender: selectedGender
		}
		const result = await handleUpdateUserInfo(props);
		if (result !== null) {
			setLoginStatus(true);
			setUserInfo(result);
		} else {
			Alert.alert('Thông báo', 'Cập nhật thông tin thất bại');
			setLoginStatus(false);
		}
	}

	return (
		<View style={{ alignItems: 'center', paddingTop: 60, backgroundColor: colors.white }}>
			<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white }}>
				<View style={[styles.activePage, { width: windowWidth / 4, marginHorizontal: 10 }, currentPageNav === 'page1Nav' ? styles.activePage : styles.inactivePage]} name='page1Nav'></View>
				<View style={[styles.inactivePage, { width: windowWidth / 4, marginHorizontal: 10 }, currentPageNav === 'page2Nav' ? styles.activePage : styles.inactivePage]} name='page2Nav'></View>
				<View style={[styles.inactivePage, { width: windowWidth / 4, marginHorizontal: 10 }, currentPageNav === 'page3Nav' ? styles.activePage : styles.inactivePage]} name='page3Nav'></View>
			</View>
			<View style={[{ alignItems: 'center', backgroundColor: colors.white }, currentPage === 'page1' ? styles.displayPage : styles.hidePage]}>
				<Text style={styles.describeText}>Trước khi bắt đầu, hãy cung cấp cho chúng tôi một vài thông tin về bạn.</Text>
				<Text style={[styles.titleText, { width: '90%', textAlign: 'left', paddingLeft: 30 }]}>1. Giới tính của bạn</Text>
				<View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginHorizontal: 40 }}>
					<TouchableOpacity
						style={[styles.genderSelect, selectedGender === 'male' ? styles.selected : styles.notSelected]}
						onPress={() => setSelectedGender('male')}>
						<Image source={require('../../assets/img_male.png')} style={{ width: 65, height: 65 }} />
						<Text style={{ textAlign: 'center', color: colors.black, fontSize: 16, marginTop: 15 }}>Nam</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.genderSelect, selectedGender === 'female' ? styles.selected : styles.notSelected]}
						onPress={() => setSelectedGender('female')}>
						<Image source={require('../../assets/img_female.png')} style={{ width: 65, height: 65 }} />
						<Text style={{ textAlign: 'center', color: colors.black, fontSize: 16, marginTop: 15 }}>Nữ</Text>
					</TouchableOpacity>
				</View>
				<Button title={"TIẾP TỤC"}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: '95%', height: 45, borderRadius: 10 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.blue, colors.lightBlue],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => {
						setCurrentPage('page2');
						setCurrentPageNav('page2Nav');
					}}>
				</Button>
			</View>
			<View style={[{ alignItems: 'center', backgroundColor: colors.white }, currentPage === 'page2' ? styles.displayPage : styles.hidePage]}>
				<Text style={[styles.titleText, { marginTop: 20 }]}>2. Tuổi và số đo cơ thể của bạn</Text>
				<View>
					<Text style={styles.headerText}>Tuổi</Text>
					<View style={styles.inputFieldContainer}>
						<TextInput style={styles.inputField}
							placeholder='Nhập tuổi của bạn'
							keyboardType='numeric'
							onChangeText={setAge}
							value={age}>
						</TextInput>
					</View>
					<Text style={[styles.headerText, { marginTop: 17 }]}>Chiều cao</Text>
					<View style={styles.inputFieldContainer}>
						<TextInput style={styles.inputField}
							placeholder='Nhập chiều cao của bạn'
							keyboardType='numeric'
							onChangeText={setHeight}
							value={height}>
						</TextInput>
						<Text style={{ position: "absolute", right: 0, paddingHorizontal: 10 }}>cm</Text>
					</View>
					<Text style={[styles.headerText, { marginTop: 17 }]}>Cân nặng</Text>
					<View style={styles.inputFieldContainer}>
						<TextInput style={styles.inputField}
							placeholder='Nhập cân nặng của bạn'
							keyboardType='numeric'
							onChangeText={setWeight}
							value={weight}>
						</TextInput>
						<Text style={{ position: "absolute", right: 0, paddingHorizontal: 10 }}>kg</Text>
					</View>
				</View>
				<Button title={"TIẾP TỤC"}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: '95%', height: 45, borderRadius: 10 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.blue, colors.lightBlue],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => {
						handleContinuePage2();
					}}>
				</Button>
			</View>
			<View style={[{backgroundColor: colors.white}, currentPage === 'page3' ? styles.displayPage : styles.hidePage]}>
				<Text style={[styles.titleText, { marginTop: 20 }]}>3. Mục tiêu của bạn</Text>
				<View style={{ marginLeft: 27 }}>
					<RadioForm
						radio_props={target}
						initial={targetSelected}
						onPress={value => {
							const selectedLabel = target.find(item => item.value === value)?.label;
							console.log(selectedLabel);
							setTargetSelected(selectedLabel);
						}}
						selectedLabelColor={colors.blue}
						buttonSize={8}
						buttonOuterSize={20}
						borderWidth={1}
						labelStyle={{ fontSize: 16, lineHeight: 30 }}
					/>
				</View>
				<Button title={"BẮT ĐẦU"}
					style={styles.btnClick}
					titleStyle={{ fontWeight: '700', fontSize: 20 }}
					buttonStyle={{ minWidth: '95%', height: 45, borderRadius: 10 }}
					ViewComponent={LinearGradient}
					linearGradientProps={{
						colors: [colors.blue, colors.lightBlue],
						start: { x: 0, y: 0.5 },
						end: { x: 1, y: 0.5 },
					}}
					onPress={() => {
						handleUpdateUser();
						Alert.alert('Thông báo', 'Hoàn tất! Chào mừng bạn đến với HealthBuddy!');
					}}>
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	inputFieldContainer: {
		backgroundColor: colors.white,
		maxWidth: '85%',
		minWidth: '85%',
		borderColor: colors.blue,
		borderWidth: 1,
		borderRadius: 10,
		height: 42,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerText: {
		color: colors.black,
		fontSize: 17,
		fontWeight: 'bold',
		textAlign: 'left',
		alignSelf: 'flex-start',
		marginBottom: 14,
	},
	inputField: {
		fontSize: 15,
		marginLeft: 10,
	},
	activePage: {
		backgroundColor: colors.blue,
		borderRadius: 15,
		paddingBottom: 5,
	},
	inactivePage: {
		backgroundColor: colors.gray,
		borderRadius: 15,
		paddingBottom: 5,
	},
	btnClick: {
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 40,
	},
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingTop: 70
	},
	describeText: {
		color: colors.black,
		fontSize: 16,
		textAlign: 'justify',
		marginVertical: 20,
		marginHorizontal: 27,
		lineHeight: 22
	},
	titleText: {
		color: colors.blue,
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
		alignSelf: 'flex-start',
		marginStart: 27
	},
	notSelected: {
		borderColor: colors.gray,
	},
	selected: {
		borderColor: colors.blue,
	},
	genderSelect: {
		borderWidth: 2,
		padding: 30,
		borderRadius: 10,
		marginHorizontal: 20,
		shadowOffset: { width: 10, height: 10 },
		shadowColor: colors.black,
		shadowOpacity: 1,
		elevation: 5,
		backgroundColor: colors.white
	},
	hidePage: {
		display: 'none',
	},
	displayPage: {
		display: 'flex',
	}
})