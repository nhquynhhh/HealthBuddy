import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef, useContext } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { format, set } from 'date-fns';
import { LiquidGauge } from 'react-native-liquid-gauge';
import ToastManager, { Toast } from 'toastify-react-native'
import { save_calories_morning, save_calories_lunch, save_calories_dinner, save_calories_exercise, save_calories_snack } from '../../services/api/api_save_calories'
import { Button } from '@rneui/themed'
import { AuthContext } from '../../context/AuthContext';
import { handleGetCalories } from '../../services/calories/get_calories'
import { handleGetUserInfo } from '../../services/info/get_info';


export default function Calories() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	// const { userInfo } = useContext(AuthContext);
	const [consumedCalories, setConsumedCalories] = useState(0);
	const [targetCalories, setTargetCalories] = useState(2000);
	const [userInfo, setUserInfo] = useState({
		age: 18,
		weight: 65,
		height: 165,
		gender: 'male',
	});


	const calculateEnergy = (user) => {
		if (user.gender == "male") {
			energy = ((6.25 * user?.height) + (10 * user?.weight) - (5 * user?.age) + 5).toFixed(0);
		} else {
			energy = ((6.25 * user?.height) + (10 * user?.weight) - (5 * user?.age) - 161).toFixed(0);
		}
		return energy;
	}

	const getUserInfo = async () => {
		const response = await handleGetUserInfo();
		if (response) {
			setUserInfo(response);		
			setTargetCalories(calculateEnergy(response));
		}
	}
	const getCalories = async () => {
		const response = await handleGetCalories();
		if (response !== 0) {
			setConsumedCalories(response.total_morning_calo + response.total_noon_calo + response.total_dinner_calo + response.total_snack_calo - response.total_exercise_calo)
		} else {
			setConsumedCalories(0);
		}
	}

	useEffect(() => {
		getCalories();
		getUserInfo();
	}, []);


	const today = new Date();
	const [openCalendar, setOpenCalendar] = useState(false);
	const [selectDate, setSelectDate] = useState(format(today.setDate(today.getDate()), 'dd/MM/yyyy'));
	function handleCalendar() {
		setOpenCalendar(!openCalendar);
	}
	function handleSelectDate(selectDate) {
		setSelectDate(selectDate);
	}
	// Chưa tối ưu, chỉnh sau nha

	const validateCalories = (calories) => {
		const caloNumber = parseInt(calories);
		if (isNaN(caloNumber) || caloNumber < 1 || caloNumber > 2000) {
			setErrorMessage('Vui lòng nhập số calo hợp lệ từ 1 đến 2000');
			Toast.error('Vui lòng nhập số calo hợp lệ từ 1 đến 2000');
			return false;
		}
		setErrorMessage('');
		return true;
	}

	const [caloValueBreakfast, setCaloValueBreakfast] = useState('');
	const [caloValueLunch, setCaloValueLunch] = useState('');
	const [caloValueDinner, setCaloValueDinner] = useState('');
	const [caloValueSnacks, setCaloValueSnacks] = useState('');
	const [caloValueWorkout, setCaloValueWorkout] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const handleCaloBreakfastChange = async () => {
		setCaloValueBreakfast(caloValueBreakfast);
		const result = await save_calories_morning(caloValueBreakfast);
		const calories = parseInt(caloValueBreakfast);
		updateConsumedCalories(calories);
		setCaloValueBreakfast('');
	};
	const handleCaloLunchChange = (caloValueLunch) => {
		setCaloValueLunch(caloValueLunch);
	};
	const handleCaloDinnerChange = (caloValueDinner) => {
		setCaloValueDinner(caloValueDinner);
	};
	const handleCaloSnacksChange = (caloValueSnacks) => {
		setCaloValueSnacks(caloValueSnacks);
	};
	const handleCaloWorkoutChange = (caloValueWorkout) => {
		setCaloValueWorkout(caloValueWorkout);
	};
	const handleCaloBreakfastSubmit = async () => {
		if (validateCalories(caloValueBreakfast)) {
			const result = await save_calories_morning(caloValueBreakfast);
			const calories = parseInt(caloValueBreakfast);
			updateConsumedCalories(calories);
			setCaloValueBreakfast('');
		}
	};
	const handleCaloLunchSubmit = async () => {
		if (validateCalories(caloValueLunch)) {
			const result = await save_calories_lunch(caloValueLunch);
			const calories = parseInt(caloValueLunch);
			updateConsumedCalories(calories);
			setCaloValueLunch('');
		}
	};
	const handleCaloDinnerSubmit = async () => {
		if (validateCalories(caloValueDinner)) {
			const result = await save_calories_dinner(caloValueDinner);
			const calories = parseInt(caloValueDinner);
			updateConsumedCalories(calories);
			setCaloValueDinner('');
		}
	};
	const handleCaloSnacksSubmit = async () => {
		if (validateCalories(caloValueSnacks)) {
			const result = await save_calories_snack(caloValueSnacks);
			const calories = parseInt(caloValueSnacks);
			updateConsumedCalories(calories);
			setCaloValueSnacks('');
		}
	};
	const handleCaloWorkoutSubmit = async () => {
		if (validateCalories(caloValueWorkout)) {
			const result = await save_calories_exercise(caloValueWorkout);
			const calories = parseInt(caloValueWorkout);
			updateWorkoutCalories(calories);
			setCaloValueWorkout('');
		}
	};
	const updateConsumedCalories = (calories) => {
		const newConsumedCalories = consumedCalories + calories;
		setConsumedCalories(newConsumedCalories);
	};
	const updateWorkoutCalories = (calories) => {
		const newConsumedCalories = consumedCalories - calories;
		setConsumedCalories(newConsumedCalories);
	};
	const showToastsMore = () => {
		Toast.error('Bạn đã tiêu thụ nhiều hơn mục tiêu rồi! \nHãy cân nhắc lại chế độ ăn của mình nhé 🥺')
	}
	const showToastsEqual = () => {
		Toast.success('Bạn đã đạt được số calo mục tiêu!\nLàm tốt lắm 🥳')
	}
	useEffect(() => {
		if (consumedCalories > targetCalories) {
			showToastsMore();
		} else if (consumedCalories === targetCalories) {
			showToastsEqual();
		}
	}, [consumedCalories]);


	return (
		<ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
			<ToastManager
				width={'100%'}
				height={100}
				position={'top'}
				positionValue={0}
				duration={7000}
				textStyle={{ fontSize: 15, lineHeight: 25, paddingRight: 5 }}
				style={{ paddingRight: 5 }} />
			<View>
				{/* <TouchableOpacity style={{ flexDirection: 'row', paddingTop: 20, alignSelf: 'center' }} onPress={handleCalendar}>
					<Icon name='calendar-outline' type='ionicon' color={colors.blue} />
					<Text style={{ color: colors.blue, textAlignVertical: 'center', paddingHorizontal: 10, fontSize: RFValue(15, 720), fontWeight: 'bold' }}>Chọn ngày</Text>
				</TouchableOpacity> */}
				<Text style={{ alignSelf: 'center', paddingTop: 10, fontSize: RFValue(15, 720), fontWeight: 'bold' }}>Ngày {selectDate}</Text>
				{/* <Button title="Solid" onPress={handleCaloBreakfastChange}/> */}
				{/* <Modal
					animationType='slide'
					transparent={true}
					visible={openCalendar}
					onRequestClose={handleCalendar}>
					<View style={styles.centerCalendar}>
						<View style={styles.modalView}>
							<DatePicker mode='calendar'
								selected={selectDate}
								onDateChange={handleSelectDate}
								maximumDate={defaultDate}>
							</DatePicker>
							<TouchableOpacity onPress={handleCalendar}>
								<Text style={{ fontSize: RFValue(14, 720), marginBottom: 20, fontWeight: 'bold' }}>Chọn</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal> */}
			</View>
			<Divider style={{ marginVertical: 20, width: '50%', alignSelf: 'center' }}></Divider>
			<Text style={{ fontSize: RFValue(16, 720), marginBottom: 20, textAlign: 'center' }}>Mục tiêu của bạn là: <Text style={{ fontWeight: 'bold', color: colors.red }}>{targetCalories} calo</Text></Text>
			<View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 30 }}>
				<LiquidGauge
					config={{
						circleColor: colors.red,
						textColor: colors.red,
						waveTextColor: colors.lightRed,
						waveColor: colors.superLightRed,
						circleThickness: 0.1,
						textVertPosition: 0.5,
						waveAnimateTime: 2000,
						maxValue: targetCalories,
						waveAnimate: true,
						textSuffix: '',
					}}
					value={consumedCalories}
					width={180}
					height={180}
				/>
			</View>
			<View style={styles.mealBox}>
				<Image source={require('../../assets/img_breakfast_icon.png')} style={{ width: 60, height: 60, marginRight: 10, alignSelf: 'center' }} />
				<View style={{ width: windowWidth * 0.65 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
						<Text style={styles.txtMeal}>Bữa sáng</Text>
						<Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
					</View>
					<TextInput style={styles.inputMeal}
						placeholder='Nhập lượng calories'
						keyboardType='numeric'
						onSubmitEditing={handleCaloBreakfastSubmit}
						onChangeText={setCaloValueBreakfast}
						value={caloValueBreakfast} />
				</View>
			</View>
			<View style={styles.mealBox}>
				<Image source={require('../../assets/img_lunch_icon.png')} style={{ width: 60, height: 60, marginRight: 10, alignSelf: 'center' }} />
				<View style={{ width: windowWidth * 0.65 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
						<Text style={styles.txtMeal}>Bữa trưa</Text>
						<Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
					</View>
					<TextInput style={styles.inputMeal}
						placeholder='Nhập lượng calories'
						keyboardType='numeric'
						onChangeText={handleCaloLunchChange}
						onSubmitEditing={handleCaloLunchSubmit}
						value={caloValueLunch} />
				</View>
			</View>
			<View style={styles.mealBox}>
				<Image source={require('../../assets/img_dinner_icon.png')} style={{ width: 60, height: 60, marginRight: 10, alignSelf: 'center' }} />
				<View style={{ width: windowWidth * 0.65 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
						<Text style={styles.txtMeal}>Bữa tối</Text>
						<Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
					</View>
					<TextInput style={styles.inputMeal}
						placeholder='Nhập lượng calories'
						keyboardType='numeric'
						onChangeText={handleCaloDinnerChange}
						onSubmitEditing={handleCaloDinnerSubmit}
						value={caloValueDinner} />
				</View>
			</View>
			<View style={styles.mealBox}>
				<Image source={require('../../assets/img_snacks_icon.png')} style={{ width: 60, height: 60, marginRight: 10, alignSelf: 'center' }} />
				<View style={{ width: windowWidth * 0.65 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
						<Text style={styles.txtMeal}>Ăn vặt</Text>
						<Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
					</View>
					<TextInput style={styles.inputMeal}
						placeholder='Nhập lượng calories'
						keyboardType='numeric'
						onChangeText={handleCaloSnacksChange}
						onSubmitEditing={handleCaloSnacksSubmit}
						value={caloValueSnacks} />
				</View>
			</View>
			<View style={styles.mealBox}>
				<Image source={require('../../assets/img_workout_calo_icon.png')} style={{ width: 60, height: 60, marginRight: 10, alignSelf: 'center' }} />
				<View style={{ width: windowWidth * 0.65 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
						<Text style={styles.txtMeal}>Vận động</Text>
						<Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
					</View>
					<TextInput style={styles.inputMeal}
						placeholder='Nhập lượng calories'
						keyboardType='numeric'
						onChangeText={handleCaloWorkoutChange}
						onSubmitEditing={handleCaloWorkoutSubmit}
						value={caloValueWorkout} />
				</View>
			</View>
			<View style={{ marginBottom: 100 }}></View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	centerCalendar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: colors.white,
		borderRadius: 20,
		width: '90%',
		padding: 5,
		alignItems: 'center',
		shadowColor: colors.black,
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	txtMeal: {
		fontSize: RFValue(15, 720),
		fontWeight: 'bold',
		textAlignVertical: 'center',
	},
	txtMealDescription: {
		fontSize: RFValue(12, 720),
		color: colors.darkGray,
		textAlignVertical: 'center',
		fontStyle: 'italic',
	},
	mealBox: {
		flexDirection: 'row',
		width: '90%',
		alignSelf: 'center',
		padding: 10,
		borderWidth: 1,
		borderColor: colors.gray,
		borderRadius: 20,
		marginVertical: 10
	},
	inputMeal: {
		borderWidth: 1,
		borderRadius: 10,
		width: '100%',
		height: 40,
		borderColor: colors.gray,
		marginTop: 10,
		padding: 10
	}

})