import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { colors } from "../../utils/colors";
import { Icon, Button } from "react-native-elements";
import { AuthContext } from '../../context/AuthContext';
import { Modal } from "react-native-paper";
import Clock from "../clock/clock";
import { getReminderTime, removeReminderTime } from "../../asyncStorage/auth";
import { handleGetUserInfo } from '../../services/info/get_info';
import { set } from "date-fns";
import { ca } from "date-fns/locale";
// import { Clock } from "../clock/ClockComponent";

const calculateEnergy = (height, weight, age, gender) => {
	weight = Math.round(parseInt(weight));
	height = parseInt(height);
	age = parseInt(age);
	console.log(height, weight, gender);
	if (gender == "male") {
		energy = (6.25 * height) + (10 * weight) - (5 * age) + 5;
	} else {
		energy = (6.25 * height) + (10 * weight) - (5 * age) - 161;
	}
	return energy;
}

function BodyIndex() {

	const [user, setUser] = useState({
		age: 18,
		weight: 60,
		height: 165,
		gender: 'male',
		username: 'user',
	});
	
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [reminderTime, setReminderTime] = useState(null);
	const [isReminder, setIsReminder] = useState(false);
	const [energy, setEnergy] = useState(0);

	const BMI = (user?.weight / ((user?.height * user?.height) / 10000)).toFixed(1);


	let Evaluate;

	switch (true) {
		case BMI < 18.5:
			Evaluate = 'Thiếu cân';
			break;
		case BMI >= 18.5 && BMI < 25:
			Evaluate = 'Bình thường';
			break;
		case BMI >= 25 && BMI < 30:
			Evaluate = 'Thừa cân';
			break;
		case BMI >= 30 && BMI < 35:
			Evaluate = 'Béo phì độ I';
			break;
		case BMI >= 35:
			Evaluate = 'Béo phì độ II';
			break;
		default:
			Evaluate = 'Thông số chưa chính xác';
	}
	const navigation = useNavigation();

	const onPressHandler = (title) => {
		navigation.navigate(title);
	}
	const handleClockClose = (newReminderTime) => {
		setIsModalVisible(false);
		if (newReminderTime) {
			setReminderTime(newReminderTime);
			setIsReminder(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const reminderTime = await getReminderTime();
			const userInfo = await handleGetUserInfo();
			if (userInfo) {
				setUser(userInfo);
				setEnergy(calculateEnergy(userInfo.height, userInfo.weight, userInfo.age, userInfo.gender));
			}
			if (reminderTime != null) {
				setReminderTime(reminderTime);
				setIsReminder(true);
			} else {
				setReminderTime(null);
				setIsReminder(false);
			}
		}
		fetchData();
		calculateEnergy();
	}, [])

	const deleteReminder = async () => {
		await removeReminderTime();
		setReminderTime(null);
		setIsReminder(false);
	}

	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: colors.white }}>
			<View style={styles.BodyContainer}>
				<Image source={require('../../assets/img_body.png')} style={{ width: 40, height: 100, marginRight: 30 }} />
				<View>
					<Text>
						<Text style={styles.Text}>Tuổi: </Text>
						<Text>{user?.age} tuổi</Text>
					</Text>
					<Text>
						<Text style={styles.Text}>Chiều cao: </Text>
						<Text>{user?.height} cm</Text>
					</Text>
					<Text>
						<Text style={styles.Text}>Cân nặng: </Text>
						<Text>{user?.weight} kg</Text>
					</Text>
				</View>
			</View>

			<View style={styles.ContainerIngredient}>
				<View style={styles.ContainerItem}>
					<Text style={styles.Text}>Chỉ số khối của cơ thể (BMI)</Text>
					<TouchableOpacity
						onPress={() => onPressHandler("BMI")}
						style={{ position: "absolute", right: 8, top: 8 }}
					>
						<Icon
							name="questioncircleo"
							type="ant-design"
							size={15}
							color={colors.gray}
						/>
					</TouchableOpacity>
					<View style={styles.alignItems}>
						<Text
							style={styles.textIndex}
						>
							{BMI}</Text>
						<Text>
							<Text>Đánh giá: </Text>
							<Text style={styles.Text}>{Evaluate}</Text>
						</Text>
					</View>
				</View>
			</View>
			<View style={styles.ContainerIngredient}>
				<View style={styles.ContainerItem}>
					<Text style={styles.Text}>Năng lượng cần mỗi ngày</Text>
					<TouchableOpacity
						onPress={() => onPressHandler("Energy")}
						style={{ position: "absolute", right: 8, top: 8 }}
					>
						<Icon
							name="questioncircleo"
							type="ant-design"
							size={15}
							color={colors.gray}
						/>
					</TouchableOpacity>
					<View style={styles.alignItems}>
						<Text style={styles.textIndex}>{energy}</Text>
						<Text>calories</Text>
					</View>
				</View>
			</View>
			<View style={styles.ContainerIngredient}>
				<View style={styles.ContainerItem}>
					<Text style={styles.Text}>Lượng nước nên uống mỗi ngày</Text>
					<View style={styles.alignItems}>
						<Text style={styles.textIndex}>2000 ml</Text>
					</View>
					<TouchableOpacity
						style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}
						onPress={() => {
							setIsModalVisible(true)
						}}
					>
						<Icon
							name="access-alarm"
							type="material-icons"
							size={25}
							color={colors.red}
							style={{ paddingRight: 10 }}
						/>
						{reminderTime ?
							<Text style={{ color: colors.blue }}>
								Nhắc nhở uống nước hàng ngày lúc {reminderTime}
							</Text> :
							<Text style={{ color: colors.red }}>
								Bật nhắc nhở uống nước
							</Text>
						}
					</TouchableOpacity>
					{isReminder && <Button
						title={"Xóa nhắc nhở"}
						buttonStyle={styles.deleteButton}
						onPress={deleteReminder}
					/>
					}
				</View>
				{isModalVisible && <Clock onClose={handleClockClose} reminderTime={reminderTime} />}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	ContainerIngredient: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "nowrap",
		marginTop: 20,
		paddingHorizontal: 20,

	},
	ContainerItem: {
		backgroundColor: colors.white,
		height: "auto",
		borderRadius: 10,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		padding: 10,
		marginVertical: 10,
	},
	BodyContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
		right: "5%"
	},
	Text: {
		fontWeight: "bold",
		fontSize: 15
	},
	alignItems: {
		alignItems: "center",
	},
	textIndex: {
		color: colors.blue,
		fontWeight: "bold",
		fontSize: 20,
		padding: 5,
	},
	deleteButton: {
		alignSelf: "center",
		marginTop: 10,
		backgroundColor: "red",
		padding: 10,
		borderRadius: 5,
	},
	deleteButtonText: {
		color: "white",
		fontWeight: "bold",
	}
});

export default BodyIndex;