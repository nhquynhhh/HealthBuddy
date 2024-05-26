import React, { useEffect, useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { handleGetRecipeByDishID } from "../../services/recipe/get_recipe_by_dish_id";
import { AuthContext } from "../../context/AuthContext";
import { handleGetFavoriteDishes } from '../../services/favorite/get_favorite_dishes';

const FoodList = ({ FoodList, Dish }) => {
	const navigation = useNavigation();
	const { userInfo } = useContext(AuthContext);


	const onPressHandler = async () => {
		if (!Dish) return;
		const recipe = await handleGetRecipeByDishID(FoodList?.id);
		const response = await handleGetFavoriteDishes(userInfo?.id);
		navigation.navigate("FoodDetails", { data: FoodList, recipe: recipe, favoriteDishes: response });
	}

	// useEffect(() => {
	// 	if (isFocused) {
	// 		handleGetFavoriteDishes(userInfo.id);
	// 	}

	// }, [isFocused]);

	return (
		<TouchableOpacity onPress={onPressHandler} key={FoodList.id} style={styles.ContainerItem}>
			<View style={styles.ContainerImage}>
				<Image source={require('../../assets/restaurant.png')} style={styles.image} />
				{FoodList?.is_premium && 
				<Text style={{marginBottom: 5}}>Premium</Text> }
			</View>
			<View>
				<Text style={{ fontWeight: "bold", padding: 8 }}>{FoodList?.name}</Text>
				<View style={styles.ContainerNutrients}>
					<View>
						<Text style={styles.ContainerTextNutrients}>{FoodList?.calo}</Text>
						<Text style={styles.text}>calo</Text>
					</View>
					<View>
						<Text style={styles.ContainerTextNutrients}>{FoodList?.carb}</Text>
						<Text style={styles.text}>carb</Text>
					</View>
					<View>
						<Text style={styles.ContainerTextNutrients}>{FoodList?.protein}</Text>
						<Text style={styles.text}>protein</Text>
					</View>
					<View>
						<Text style={styles.ContainerTextNutrients}>{FoodList?.fat}</Text>
						<Text style={styles.text}>fat</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	ContainerItem: {
		backgroundColor: "#fff",
		width: "45%",
		height: 230,
		marginBottom: 20,
		borderRadius: 10,
		elevation: 4,
		borderWidth: 1,
		borderColor: "#D8D8D8",

	},
	ContainerImage: {
		height: "60%",
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		objectFit: "contain"
	},
	ContainerNutrients: {
		display: "flex",
		justifyContent: "space-around",
		flexDirection: "row",
	},
	ContainerTextNutrients: {
		fontWeight: "700",
		color: "#008dda",
		textAlign: "center",
		fontSize: 12,
	},
	text: {
		fontSize: 10,
	}
})

export default FoodList;