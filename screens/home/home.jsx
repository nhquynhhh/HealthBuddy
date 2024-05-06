
import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as Progress from 'react-native-progress';
import { FlatGrid } from 'react-native-super-grid';
import { colors } from '../../utils/colors';
import { AuthContext } from '../../context/AuthContext';

export default function Home() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();
	const { userInfo, setUserInfo, account } = useContext(AuthContext);
    user = {
        age: userInfo.age,
        weight: userInfo.weight,
        height: userInfo.height,
        gender: userInfo.gender == 'male' ? 'nam' : 'nữ',
    }
    const BMI = (user?.weight/((user?.height*user?.height)/10000)).toFixed(1);
    let energy;
    if(user?.gender == "nam"){
        energy = (6.25 * user?.height) + (10 * user?.weight) - (5 * user?.age) + 5;
    }else {
        energy = (6.25 * user?.height) + (10 + user?.weight) - (5 * user?.age) - 161;
    }
	const caloriesNeeded = energy - 0;
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

	const [favDish, setFavDish] = React.useState([
		{ name: 'Mì Ý Thịt Băm', image: { uri: 'https://www.marionskitchen.com/wp-content/uploads/2022/12/Filipino-Spaghetti-04.jpg' }, isFavorite: true },
		{ name: 'Mì Ý Thịt Băm', image: { uri: 'https://www.marionskitchen.com/wp-content/uploads/2022/12/Filipino-Spaghetti-04.jpg' }, isFavorite: true },
		{ name: 'Mì Ý Thịt Băm', image: { uri: 'https://www.marionskitchen.com/wp-content/uploads/2022/12/Filipino-Spaghetti-04.jpg' }, isFavorite: true },
		{ name: 'Mì Ý Thịt Băm', image: { uri: 'https://www.marionskitchen.com/wp-content/uploads/2022/12/Filipino-Spaghetti-04.jpg' }, isFavorite: true },
	]);

	return (
		<ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }} showsVerticalScrollIndicator={false}>
			{/* Header */}
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: windowWidth * 0.5, paddingLeft: 20, paddingTop: 20, paddingBottom: 10 }}>
				<Image source={require('../../assets/img_bare_logo.png')} style={{ width: 50, height: 50 }}></Image>
				<Text style={{ textAlignVertical: 'center', fontSize: RFValue(20, 720), marginLeft: 15 }}>Xin chào, <Text style={{ fontWeight: '800' }}>{userInfo.username}</Text>!</Text>
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
									onPress={() => navigation.navigate(item.screen)}
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
				<Text style={{ textAlign: 'right', fontSize: RFValue(12, 720), marginBottom: 15 }}>Hoàn thành: <Text style={{ color: colors.blue, fontWeight: 'bold' }}>50%</Text></Text>
				<Progress.Bar progress={0.5}
					width={RFValue(280, 720)}
					height={6}
					unfilledColor={colors.gray}
					borderWidth={0}
					color={colors.green}
					style={{ alignSelf: 'center' }} />
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
					<Text style={{ fontSize: RFValue(13, 720) }}>Mục tiêu:</Text>
					<Text style={{ fontWeight: 'bold' }}>{energy} calories</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
					<Text style={{ fontSize: RFValue(13, 720) }}>Calories đã hấp thụ:</Text>
					<Text style={{ fontWeight: 'bold' }}>0 calories</Text>
				</View>
				<Divider style={{ backgroundColor: colors.gray, height: 0.2, marginTop: 15 }}></Divider>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, fontSize: RFValue(13, 720) }}>
					<Text style={{ fontWeight: 'bold' }}>Cần thêm:</Text>
					<Text style={{ fontWeight: 'bold', color: colors.blue, fontSize: RFValue(14, 720) }}>{caloriesNeeded} calories</Text>
				</View>
				<TouchableOpacity onPress={() => { navigation.navigate('Calories') }}>
					<Text style={{ textAlign: 'right', marginTop: 15, fontStyle: 'italic', color: colors.darkGray }}>Chi tiết {'\u25BA'}</Text>
				</TouchableOpacity>
			</View>
			{/* Favourite dish */}
			<View style={{ padding: 20, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 10, borderColor: colors.gray, marginVertical: 20 }}>
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
			</View>
		</ScrollView>

	)
}

const styles = StyleSheet.create({
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
