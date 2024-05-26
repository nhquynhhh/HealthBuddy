import React, { useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Foodlist from "../food_list/food_list"
import { colors } from "../../utils/colors";
import { useState } from "react";
import { handleGetFavList } from "../../services/favorite/get_favorite_dishes";
import { AuthContext } from '../../context/AuthContext';
import { useNavigation, useIsFocused } from "@react-navigation/native"
import NoResults from "../no_results/no_results";

function FavouriteFood() {
	const [wishList, setWishList] = useState([]);
	const [listItems, setListItems] = useState([]);
	const { userInfo } = useContext(AuthContext);
	const isFocused = useIsFocused();
	const [existFav, setExistFav] = useState(false);

	const getFavList = async () => {
		setWishList([])
		const response = await handleGetFavList(userInfo.id);
		console.log("response", response);
		if (response.length > 0) {
			setExistFav(true);
			let dataToLoad = [];
			dataToLoad = response.map(item => ({
				dish: {
					id: item.id,
					img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
					name: item.name,
					calo: item.calo,
					protein: item.protein,
					carb: item.carb,
					fat: item.fat
				}
			}));
			setWishList(dataToLoad);
		} else {
			setExistFav(false);
		}
	}

	useEffect(() => {
		if (isFocused) {
			getFavList();
		}
	}, [isFocused]);

	useEffect(() => {
		getFavList();
	}, []);
	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: colors.white }}>
			<ScrollView >
				{existFav ?
					<View style={styles.wishListContainer}>
						{wishList.map((item) => (
							<Foodlist key={item.dish.id} FoodList={item.dish} Dish={true} />
						))}
					</View> : <NoResults height="100%" />}

			</ScrollView>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	wishListContainer: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: colors.white,
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom: 100,
	},
})

export default FavouriteFood;
