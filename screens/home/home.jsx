import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, Alert, RefreshControl, SafeAreaView, StatusBar } from 'react-native'
import React, { Component, useContext, useEffect, useState, useCallback } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Progress from 'react-native-progress';
import { FlatGrid } from 'react-native-super-grid';
import { colors } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';
import { handleGetHomeFavoriteDishes } from '../../services/favorite/get_home_fav';
import { set } from 'date-fns';
import { handleGetCalories } from '../../services/calories/get_calories'
import { call_get_water } from '../../services/api/api_water';
import { SuggestDishComponent } from '../SuggestDishComponent/index';
import { handleGetUserInfo } from '../../services/info/get_info';

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
	const a = 0;
	return energy;
	////// //tesst
}


export default function Home() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();
	const { userInfo, setUserInfo } = useContext(AuthContext);
	const isFocused = useIsFocused();
	const [idFavDishes, setIdFavDishes] = useState([]);
	const favDishList = [];
	const [favDish, setFavDish] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [updatedFavDish, setUpdatedFavDish] = useState([]);
	const [isPremium, setIsPremium] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [targetCalories, setTargetCalories] = useState(1);
	const [user, setUser] = useState({
		age: 18,
		weight: 60,
		height: 165,
		gender: 'male',
		username: 'user',
	});

	const calculateEnergy = (user) => {
		if (user.gender == "male") {
			energy = ((6.25 * user?.height) + (10 * user?.weight) - (5 * user?.age) + 5).toFixed(0);
		} else {
			energy = ((6.25 * user?.height) + (10 * user?.weight) - (5 * user?.age) - 161).toFixed(0);
		}
		return energy;
	}

	const getFavoriteDishes = async () => {
		setFavDish([]);
		const response = await handleGetHomeFavoriteDishes(user.id);
		if (response.length > 0) {
			response.map((item) => {
				favDishList.push({ name: item, image: { uri: 'https://www.marionskitchen.com/wp-content/uploads/2022/12/Filipino-Spaghetti-04.jpg' }, isFavorite: true });
			})
			console.log("favDishList", favDishList);
			setFavDish(favDishList);
		}
	}

	const [calories, setCalories] = useState(0);
	const [caloWorkOut, setCaloWorkOut] = useState(0);

	const getCalories = async () => {
		const response = await handleGetCalories();
		if (response !== 0) {
			setCalories(response.total_morning_calo + response.total_noon_calo + response.total_dinner_calo + response.total_snack_calo);
			setCaloWorkOut(response.total_exercise_calo);
		} else {
			setCalories(0);
			setCaloWorkOut(0);
		}
	}

	const getUserInfo = async () => {
		const response = await handleGetUserInfo();
		if (response) {
			setIsPremium(response.has_subscription);
			setTargetCalories(calculateEnergy(response));
			setUser(response);
		}
	}

	useEffect(() => {
		getUserInfo();
		setRefreshing(true);
		getFavoriteDishes();
		getCalories();
		setRefreshing(false);
	}, [isFocused]);

	useEffect(() => {
		getUserInfo();
		setRefreshing(true);
		getFavoriteDishes();
		getCalories();
		setRefreshing(false);

	}, []);

	const onRefresh = () => {
		setRefreshing(true);
		getCalories();
		getUserInfo();
		getFavoriteDishes();
		setRefreshing(false);
		console.log("refreshing", user);
		setUserInfo(user);
	}

	const categories = [
		{ image: require('../../assets/img_kcal_icon.png'), label: 'Kiểm soát\ncalories', screen: 'Calories', tab: '' },
		{ image: require('../../assets/img_water_icon.png'), label: 'Theo dõi\nuống nước', screen: 'Water', tab: '' },
		{ image: require('../../assets/img_workout_icon.png'), label: 'Vận động\ncơ thể', screen: 'Workout', tab: '' },
		{ image: require('../../assets/img_body_index_icon.png'), label: 'Chỉ số\nsức khỏe', screen: 'BodyIndex', tab: '' },
		{ image: require('../../assets/img_favourite_dish_icon.png'), label: 'Món ăn\nyêu thích', screen: 'FavouriteFood', tab: '' },
		{ image: require('../../assets/img_suggest_icon.png'), label: 'Gợi ý\nthực đơn', screen: 'MenuSuggestion', tab: '' },
		{ image: require('../../assets/img_statistics_icon.png'), label: 'Thống kê\nchi tiết', screen: 'Statistics', tab: 'StatisticsTab' },
		{ image: require('../../assets/img_search_icon.png'), label: 'Tra cứu', screen: 'Search', tab: '' },
	];

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content"  />
			<ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }} showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View style={{ flexDirection: 'row', paddingLeft: 20, paddingTop: 20, paddingBottom: 10 }}>
					<Image source={require('../../assets/img_bare_logo.png')} style={{ width: 50, height: 50 }}></Image>
					<Text style={{ textAlignVertical: 'center', fontSize: RFValue(16, 720), marginLeft: 15 }}>Xin chào, {"\n"}
						<Text style={{ fontWeight: '800', fontSize: RFValue(18, 720) }}>{user?.username}</Text></Text>
				</View>
				{/* Divider */}
				<Divider style={{ backgroundColor: colors.gray, height: 0.5 }}></Divider>
				{/* Category list */}
				<View style={[styles.catList, { marginTop: 30, width: windowWidth * 0.97 }]}>
					<FlatList
						scrollEnabled={false}
						data={categories}
						renderItem={({ item }) => {
							if (item.tab !== '') {
								return (
									<TouchableOpacity
										style={[styles.iconContainer, { width: windowWidth * 0.96 / 4 }]}
										onPress={() => {

											navigation.navigate(item.tab, item.screen)
										}}
									>
										<View style={styles.roundContainer}>
											<Image source={item.image} style={styles.image} />
										</View>
										<Text style={styles.text}>{item.label}</Text>
									</TouchableOpacity>
								);
							} else {
								return (
									<TouchableOpacity
										style={[styles.iconContainer, { width: windowWidth * 0.96 / 4 }]}
										onPress={() => {
											if (item.screen == 'MenuSuggestion' && !isPremium) {
												Alert.alert('Thông báo', 'Chức năng này chỉ dành cho tài khoản Premium', [{ text: 'OK' }])
												return;
											}
											navigation.navigate(item.screen)
										}}
									>
										<View style={styles.roundContainer}>
											<Image source={item.image} style={styles.image} />
										</View>
										<Text style={styles.text}>{item.label}</Text>
									</TouchableOpacity>
								);
							}
						}}
						keyExtractor={(item, index) => index.toString()}
						numColumns={4}
						columnWrapperStyle={styles.row}
					/>
				</View>
				{/* Today's calories */}
				<View style={{ padding: 20, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 10, borderColor: colors.gray, marginVertical: 20 }}>
					<Text style={styles.headerBox}>Lượng calories hôm nay</Text>
					<Text style={{ textAlign: 'right', fontSize: RFValue(12, 720), marginBottom: 15 }}>Hoàn thành: <Text style={{ color: colors.blue, fontWeight: 'bold' }}>{(((calories - caloWorkOut) / targetCalories) * 100).toFixed(2)} %</Text></Text>
					<Progress.Bar progress={(calories - caloWorkOut) / targetCalories}
						width={RFValue(280, 720)}
						height={6}
						unfilledColor={colors.gray}
						borderWidth={0}
						color={((calories - caloWorkOut) / targetCalories) > 1 ? colors.red : colors.green}
						style={{ alignSelf: 'center' }} />
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
						<Text style={{ fontSize: RFValue(13, 720) }}>Mục tiêu:</Text>
						<Text style={{ fontWeight: 'bold' }}>{targetCalories} calories</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
						<Text style={{ fontSize: RFValue(13, 720) }}>Calories đã hấp thụ:</Text>
						<Text style={{ fontWeight: 'bold' }}>{calories} calories</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
						<Text style={{ fontSize: RFValue(13, 720) }}>Calories vận động:</Text>
						<Text style={{ fontWeight: 'bold' }}>{caloWorkOut} calories</Text>
					</View>
					<Divider style={{ backgroundColor: colors.gray, height: 0.2, marginTop: 15 }}></Divider>
					{calories - caloWorkOut > targetCalories ? (
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, fontSize: RFValue(13, 720) }}>
							<Text style={{ fontWeight: 'bold' }}>Cần vận động thêm:</Text>
							<Text style={{ fontWeight: 'bold', color: colors.blue, fontSize: RFValue(14, 720) }}>{(calories - caloWorkOut) - targetCalories} calories</Text>
						</View>
					) : (
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, fontSize: RFValue(13, 720) }}>
							<Text style={{ fontWeight: 'bold' }}>Cần thêm:</Text>
							<Text style={{ fontWeight: 'bold', color: colors.blue, fontSize: RFValue(14, 720) }}>{targetCalories - (calories - caloWorkOut)} calories</Text>
						</View>

					)}
					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, fontSize: RFValue(13, 720) }}>
					<Text style={{ fontWeight: 'bold' }}>Cần thêm:</Text>
					<Text style={{ fontWeight: 'bold', color: colors.blue, fontSize: RFValue(14, 720) }}>{targetCalories - (calories - caloWorkOut)} calories</Text>
				</View> */}
					<TouchableOpacity onPress={() => { navigation.navigate('Calories') }}>
						<Text style={{ textAlign: 'right', marginTop: 15, fontStyle: 'italic', color: colors.darkGray }}>Chi tiết {'\u25BA'}</Text>
					</TouchableOpacity>
				</View>
				{isPremium ? (
					<SuggestDishComponent />
				) : (
					<TouchableOpacity
						onPress={() => Alert.alert('Thông báo', 'Đăng ký để mở khóa tính năng Gợi ý món ăn', [{ text: 'OK' }])}
						style={{
							padding: 20,
							borderWidth: 1,
							width: windowWidth * 0.9,
							alignSelf: 'center',
							borderRadius: 10,
							borderColor: colors.gray,
							marginVertical: 20
						}}
					>
						<Text style={[styles.headerBox, { marginBottom: 20 }]}>Gợi ý món ăn</Text>
						<Text style={{ textAlign: 'center', color: colors.red, fontWeight: 'bold', marginTop: 0.5 }}>CHỈ ÁP DỤNG CHO THÀNH VIÊN PREMIUM </Text>
						<Text style={{ fontStyle: 'italic', textAlign: 'center', color: colors.darkGray, marginTop: 10 }}>Đăng ký để mở khóa tính năng Gợi ý món ăn</Text>
					</TouchableOpacity>
				)}
				{/* Favourite dish */}
				{/* <View style={{ padding: 20, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 10, borderColor: colors.gray, marginVertical: 20 }}>
				<Text style={[styles.headerBox, { marginBottom: 20 }]}>Món ăn yêu thích</Text>
				<FlatGrid
					scrollEnabled={false}
					contentContainerStyle={{ justifyContent: 'space-around' }}
					itemDimension={100}
					data={favDish}
					style={styles.gridView}
					spacing={5}
					maxItemsPerRow={2}
					renderItem={({ item }) => (
						<TouchableOpacity style={[styles.dishContainer, { alignItems: 'center' }]}>
							<Image source={item.image} style={styles.dishImage} />
							<Text style={styles.dishName}>{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
				<TouchableOpacity onPress={() => { navigation.navigate('FavouriteFood') }}>
					<Text style={{ textAlign: 'right', fontStyle: 'italic', color: colors.darkGray }}>Chi tiết {'\u25BA'}</Text>
				</TouchableOpacity>
			</View> */}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	catList: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	iconContainer: {
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	text: {
		marginTop: 5,
		textAlign: 'center',
		lineHeight: 20,
		fontWeight: '600',
		fontSize: RFValue(12.5, 720)
	},
	roundContainer: {
		width: 55,
		height: 55,
		borderRadius: 50,
		backgroundColor: colors.paleGray,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 35,
		height: 35,
	},
	headerBox: {
		fontWeight: 'bold',
		fontSize: RFValue(15, 720)
	},
	dishImage: {
		width: 110,
		height: 110,
		borderRadius: 10,
	},
	dishName: {
		textAlign: 'center',
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: RFValue(14, 720),
	},
	dishContainer: {
		marginBottom: 20,
	},
	gridView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
})
