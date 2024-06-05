import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { colors } from '../utils/colors'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home/home';
import Statistics from '../screens/statistics/statistics';
import Scan from '../screens/scan/scan';
import Notifications from '../screens/notifications/notifications';
import Personal from '../screens/personal/personal';
import Calories from '../screens/calories/calories';
import Water from '../screens/water/water';
import WorkoutDetail1 from '../screens/workout/workout_detail1';
import WorkoutDetail2 from '../screens/workout/workout_detail2';
import WorkoutDetail3 from '../screens/workout/workout_detail3';
import WorkoutDetail4 from '../screens/workout/workout_detail4';
import WorkoutDetail5 from '../screens/workout/workout_detail5';
import Workout from '../screens/workout/workout';
import BodyIndex from '../screens/body_index/body_index';
import FavouriteFood from '../screens/fav_food/fav_food';
import MenuSuggestion from '../screens/menu_suggest/menu_suggest';
import Search from '../screens/search/search';
import Premium from '../screens/premium/premium';
import BMI from '../screens/bmi/bmi';
import FoodDetails from '../screens/food_details/food_details';
import Energy from '../screens/energy/energy';
import Reminders from '../screens/reminders/reminders';
import React, { useState, useContext } from 'react';
import Payment from '../screens/webview/payment';
import { handleGetUserInfo } from '../services/info/get_info';

const MainNavigator = () => {

    const navigation = useNavigation();

	const onPressScanTab = async () => {

		const info = await handleGetUserInfo();

		if (info.has_subscription === true) {
			navigation.navigate("ScanTab", "Scan");
		} else {
			Alert.alert('Thông báo', 'Chức năng này chỉ dành cho tài khoản Premium', [{ text: 'OK' }])
		}
	}

	const onPressHomeTab = async () => {
		navigation.navigate("HomeTab", "Home");
	}

	const onPressStatisticsTab = async () => {
		navigation.navigate("StatisticsTab", "StatisticsStackScreens");
	}

	const onPressPersonalTab = async () => {
		navigation.navigate("PersonalTab", "PersonalStackScreens");
	}

	const onPressWorkoutTab = async () => {
		navigation.navigate("NotiTab", "WorkoutStackScreens");
	}

	const HomeStack = createNativeStackNavigator();
	function HomeStackScreens() {
		return (
			<HomeStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}>
				<HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<HomeStack.Screen name="Calories" component={Calories} options={{ headerTitle: "Kiểm soát Calories" }} />
				<HomeStack.Screen name="Water" component={Water} options={{ headerTitle: "Theo dõi uống nước" }} />
				<WorkoutStack.Screen name="Workout" component={WorkoutStackScreens} options={{ headerShown: false }} />
				<HomeStack.Screen name="BodyIndex" component={BodyIndex} options={{ headerTitle: "Chỉ số cơ thể" }} />
				<HomeStack.Screen name="Statistics" component={StatisticsStackScreens} options={{ headerShown: false }} />
				<HomeStack.Screen name="FavouriteFood" component={FavouriteFood} options={{ headerTitle: "Món ăn yêu thích" }} />
				<HomeStack.Screen name="MenuSuggestion" component={MenuSuggestion} options={{ headerTitle: "Gợi ý thực đơn" }} />
				<HomeStack.Screen name="Search" component={Search} options={{ headerTitle: "Tra cứu" }} />
				<HomeStack.Screen name="BMI" component={BMI} options={{ headerTitle: "BMI là gì ?" }} />
				<HomeStack.Screen name="Energy" component={Energy} options={{ headerTitle: "Cách tính năng lượng" }} />
				<HomeStack.Screen name="FoodDetails" component={FoodDetails}
					options={({ route }) => ({
						headerTitle: route.params.data.name
					})}
				/>
			</HomeStack.Navigator>
		)
	}
	const NotiStack = createNativeStackNavigator();
	function NotiStackScreens() {
		return (
			<NotiStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}>
				<NotiStack.Screen name="Noti" component={Notifications} options={{ headerTitle: "Thông báo" }} />
			</NotiStack.Navigator>
		)
	}

	const PersonalStack = createNativeStackNavigator();
	function PersonalStackScreens() {
		return (
			<PersonalStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}>
				<PersonalStack.Screen name="Personal" component={Personal} options={{ headerTitle: "Tài khoản của tôi" }} />
				<PersonalStack.Screen name="Premium" component={Premium} options={{ headerTitle: "Nâng cấp tài khoản" }} />
			</PersonalStack.Navigator>
		)
	}

	const WorkoutStack = createNativeStackNavigator();
	function WorkoutStackScreens() {
		return (
			<WorkoutStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}>
				<WorkoutStack.Screen name="WorkoutStack" component={Workout} options={{ headerTitle: "Vận động cơ thể" }} />
				<WorkoutStack.Screen name="WorkoutDetail1" component={WorkoutDetail1} options={{ headerTitle: "Chi tiết bài tập" }} />
				<WorkoutStack.Screen name="WorkoutDetail2" component={WorkoutDetail2} options={{ headerTitle: "Chi tiết bài tập" }} />
				<WorkoutStack.Screen name="WorkoutDetail3" component={WorkoutDetail3} options={{ headerTitle: "Chi tiết bài tập" }} />
				<WorkoutStack.Screen name="WorkoutDetail4" component={WorkoutDetail4} options={{ headerTitle: "Chi tiết bài tập" }} />
				<WorkoutStack.Screen name="WorkoutDetail5" component={WorkoutDetail5} options={{ headerTitle: "Chi tiết bài tập" }} />
			</WorkoutStack.Navigator>
		)
	}

	const StatisticsStack = createNativeStackNavigator();
	function StatisticsStackScreens() {
		return (
			<StatisticsStack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontWeight: 'bold' } }}>
				<StatisticsStack.Screen name="StatisticsStack" component={Statistics} options={{ headerTitle: "Thống kê chi tiết" }} />
			</StatisticsStack.Navigator>
		)
	}

	const Tab = createBottomTabNavigator();
	function BottomNavigation() {
		const screenOptions = {
			tabBarShowLabel: false,
			headerShown: false,
			tabBarStyle: {
				position: "absolute",
				bottom: 0,
				right: 0,
				left: 0,
				elevation: 0,
				height: 60,
				background: "#fff"
			}
		}
		return (
			<Tab.Navigator screenOptions={screenOptions}>
				<Tab.Screen name="HomeTab"
					component={HomeStackScreens}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TouchableOpacity onPress={onPressHomeTab}>
								<View style={{ alignItems: "center", justifyContent: "center" }}>
									<Icon name={focused ? "home" : "home-outline"} type="ionicon" size={23} color={focused ? colors.blue : colors.black} />
									<Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Trang chủ</Text>
								</View>
								</TouchableOpacity>
							)
						}
					}} />
				<Tab.Screen name="StatisticsTab"
					component={StatisticsStackScreens}
					options={{
						headerTitle: "Thống kê",
						tabBarIcon: ({ focused }) => {
							return (
								<TouchableOpacity onPress={onPressStatisticsTab}>
								<View style={{ alignItems: "center", justifyContent: "center" }}>
									<Icon name={focused ? "stats-chart-sharp" : "stats-chart-outline"} type="ionicon" size={23} color={focused ? colors.blue : colors.black} />
									<Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Thống kê</Text>
								</View>
								</TouchableOpacity>
							)
						}
					}} />
				<Tab.Screen name="ScanTab"
					component={Scan}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TouchableOpacity onPress={onPressScanTab}>
								<LinearGradient
									colors={[colors.blue, colors.lightBlue]}
									start={{ x: 0, y: 0 }}
									end={{ x: 0.5, y: 0 }}
									style={{
										alignItems: "center",
										justifyContent: "center",
										width: 60,
										height: 60,
										borderRadius: 15,
										top: -30
									}}>
									<Icon name="scan-helper" type="material-community" size={35} color="white" />
									
								</LinearGradient>
								</TouchableOpacity>
							)
						},
						// tabBarButton: () => {
							
						// }
					}} />
				<Tab.Screen name="NotiTab"
					component={WorkoutStackScreens}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TouchableOpacity onPress={onPressWorkoutTab}>
								<View style={{ alignItems: "center", justifyContent: "center" }}>
									<Icon name={focused ? "accessibility" : "accessibility-outline"} type="ionicon" size={23} color={focused ? colors.blue : colors.black} />
									<Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Tập luyện</Text>
								</View>
								</TouchableOpacity>
							)
						}
					}} />
				<Tab.Screen name="PersonalTab"
					component={PersonalStackScreens}
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TouchableOpacity onPress={onPressPersonalTab}>
								<View style={{ alignItems: "center", justifyContent: "center" }}>
									<Icon name={focused ? "person" : "person-outline"} type="ionicon" size={23} color={focused ? colors.blue : colors.black} />
									<Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Cá nhân</Text>
								</View>
								</TouchableOpacity>
							)
						}
					}} />

			</Tab.Navigator>


		)
	}
	const RootStack = createNativeStackNavigator();

	return (
		  <RootStack.Navigator screenOptions={{ headerShown: false }}>
			<RootStack.Screen name="Main" component={BottomNavigation} />
			<RootStack.Screen name="Payment" component={Payment} options={{ headerTitle: "MOMO PAYMENt" }} />
		  </RootStack.Navigator>
	  )
	}

export default MainNavigator;