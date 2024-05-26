import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../utils/colors";
import { handleGetRecipeByDishID } from "../../services/recipe/get_recipe_by_dish_id";
import { AuthContext } from "../../context/AuthContext";
import { handleChangeFavorite } from "../../services/favorite/change_favorite";
import { is } from "date-fns/locale";
import { add } from "date-fns";
const windowHeight = Dimensions.get('window').height;
const imageHeight = windowHeight * 0.35;

function FoodDetails({ route }) {
	const { data, recipe, favoriteDishes } = route.params;
	const { userInfo } = useContext(AuthContext);

	const [isFavorite, setIsFavorite] = useState(false);


	const toggleFavorite = async () => {
		user_id = userInfo.id;
		dish_id = data?.id;
		type = isFavorite ? 0 : 1;
		console.log(isFavorite);
		console.log(type);
		const response = await handleChangeFavorite({ user_id, dish_id, type });
		const { message } = response;
		setIsFavorite(!isFavorite);
		Alert.alert('Thông báo', message);
	}

	useEffect(() => {
		console.log("favoriteDishes", favoriteDishes);
		let isFavoriteFound = false;
		if (favoriteDishes.length === 0) return;
		favoriteDishes.forEach((item) => {
			if (item === data.id) {
				isFavoriteFound = true;
				return; // Kết thúc vòng lặp
			}
		});
		if (isFavoriteFound) {
			setIsFavorite(true);
		}
		console.log(FoodList.img)
	}, []);

	const FoodList = data;
	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: colors.white}}>
			<ScrollView>
				<View style={styles.DetailsContainer}>
					<View style={styles.ContainerImage}>
						<Image source={{ uri: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg" }} style={styles.image} />
						<TouchableOpacity onPress={toggleFavorite} style={{ position: "absolute", right: 0, top: 0, padding: 10 }}>
							<Image source={isFavorite ? require('../../assets/img_favourite_check.png') : require('../../assets/heart.png')} style={{ width: 30, height: 30 }} />
						</TouchableOpacity>
						{/* <Image source={require('../../assets/heart.png')} style={{width: 30, height: 30, position: "absolute", right: 14, top: 10}}/> */}
					</View>

					<View style={{ paddingHorizontal: 30, flex: 1, top: -30 }}>
						<LinearGradient
							colors={[colors.blue, colors.lightBlue]}
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							style={styles.ContainerNutrients}
						>
							<View style={styles.alignItems}>
								<Text style={styles.ContainerTextNutrients}>{FoodList?.calo}</Text>
								<Text style={styles.text}>calo</Text>
							</View>
							<View style={styles.alignItems}>
								<Text style={styles.ContainerTextNutrients}>{FoodList?.carb}</Text>
								<Text style={styles.text}>carb</Text>
							</View>
							<View style={styles.alignItems}>
								<Text style={styles.ContainerTextNutrients}>{FoodList?.protein}</Text>
								<Text style={styles.text}>protein</Text>
							</View>
							<View style={styles.alignItems}>
								<Text style={styles.ContainerTextNutrients}>{FoodList?.fat}</Text>
								<Text style={styles.text}>fat</Text>
							</View>
						</LinearGradient>

					</View>

					<View style={styles.ContainerIngredient}>
						<View style={styles.ContainerItem}>
							<Text style={styles.text2}>Nguyên liệu chuẩn bị</Text>
							{recipe?.map((item, index) => {
								return (
									<Text key={index}> {item.grams}g {item.name}</Text>
								)
							})
							}
						</View>
					</View>
					{/* <View style={styles.ContainerIngredient}>
						<View style={styles.ContainerItem}>
							<Text style={styles.text2}>Cách chế biến</Text>
							<Text>ab</Text>
							<Text>cd</Text>
							<Text>ef</Text>
							<Text>gh</Text>
							<Text>tk</Text>
						</View>
					</View> */}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	DetailsContainer: {
		paddingBottom: 100,

	},
	ContainerIngredient: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "nowrap",
		paddingHorizontal: 20,

	},
	ContainerItem: {
		backgroundColor: "#fff",
		height: "auto",
		borderRadius: 10,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		padding: 10,
		marginVertical: 10,
	},
	ContainerImage: {
		height: imageHeight,

	},
	image: {
		width: "100%",
		height: "100%",
	},
	ContainerNutrients: {
		display: "flex",
		justifyContent: "space-around",
		flexDirection: "row",
		borderRadius: 10,
		elevation: 2,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		padding: 10,

	},
	ContainerTextNutrients: {
		fontWeight: "700",
		color: colors.white,
		textAlign: "center",
		fontSize: 20,
	},
	text: {
		fontSize: 12,
		color: colors.white,
	},
	alignItems: {
		alignItems: "center",
	},
	text2: {
		fontWeight: "700"
	}
})
export default FoodDetails;