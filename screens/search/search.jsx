import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import FoodList from "../food_list/food_list";
import NoResults from "../no_results/no_results";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../utils/colors";
import { AuthContext } from '../../context/AuthContext';
import { set } from "date-fns";

function Search() {
	const { dishes, setDishes } = useContext(AuthContext);
	const { ingredients, setIngredients } = useContext(AuthContext);
	const [ListItems, setListItems] = useState([]);
	const [listDishes, setListDishes] = useState([]);
	const [listIngredients, setListIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDish, setIsDish] = useState(true);
	const [isIngredient, setIsIngredient] = useState();
	const [isSearchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setIsDish(true);
		setIsIngredient(false);
		setListItems([]);
		setListDishes(dishes);
		setListIngredients(ingredients);
		setIsLoading(true);
		loadData();
	}, []);

	useEffect(() => {
		loadData();
	}, [isDish, isIngredient]);

	const loadData = () => {
		let dataToLoad = [];
		if (isDish) {
			dataToLoad = listDishes.map(item => ({
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
		} else if (isIngredient) {
			dataToLoad = listIngredients.map(item => ({
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
		}
		setListItems(dataToLoad);
		setIsLoading(false);
	};

	const handleSearch = (text) => {
		setSearchQuery(text);
	};

	const filteredWishListItems = ListItems.filter(item =>
		item.dish.name.toLowerCase().includes(isSearchQuery.toLowerCase())
	);


	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: colors.white, paddingBottom: 100 }}>
			<View style={styles.btnContainer}>
				<Button
					title={"Món ăn"}
					onPressIn={() => {
						setSearchQuery("");
						setIsDish(true);
						setIsIngredient(false);
						setListItems([]);
						setIsLoading(true);
					}}
					titleStyle={{
						fontWeight: '700', fontSize: 12,
						color: isDish ? colors.white : colors.black
					}}
					buttonStyle={{
						width: 100, height: 45, borderRadius: 20,
						backgroundColor: isDish ? colors.lightBlue : colors.gray
					}}
					containerStyle={{ marginLeft: 30, marginRight: 15 }}
				/>
				<Button
					title={"Nguyên liệu"}
					onPressIn={() => {
						setSearchQuery("");
						setIsDish(false);
						setIsIngredient(true);
						setListItems([]);
						setIsLoading(true);
					}}
					titleStyle={{
						fontWeight: '700', fontSize: 12,
						color: isIngredient ? colors.white : colors.black
					}}
					buttonStyle={{
						width: 100, height: 45, borderRadius: 20,
						backgroundColor: isIngredient ? colors.lightBlue : colors.gray
					}}
					containerStyle={{}}
				/>
			</View>
			<View style={styles.searchContainer}>
				<View style={styles.inputContainer}>
					<Icon
						name="search"
						size={24}
						color="black"
					/>
					<TextInput
						style={styles.input}
						placeholder="Tra cứu..."
						onChangeText={handleSearch}
						value={isSearchQuery}
					/>
				</View>
			</View>
			<ScrollView style={styles.scrollView} >
				{isLoading ? (
					<ActivityIndicator size="large" color={colors.primary} />
				) : (
					<View style={styles.ListContainer}>
						{filteredWishListItems.length > 0 ? (
							filteredWishListItems.map((item) => (
								<FoodList key={item.dish.id} FoodList={item.dish} Dish={isDish ? true : false} />
							))
						) : isSearchQuery ? (
							<NoResults height={400} />
						) : (
							ListItems.map((item) => (
								<FoodList key={item.dish.id} FoodList={item.dish} Dish={isDish ? true : false} />
							))
						)}
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({

	btnContainer: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		paddingTop: 10,

	},
	searchContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 20,
		width: "90%",
		height: 50,
		marginTop: 10,
		paddingLeft: 10,
		backgroundColor: colors.gray,
	},
	input: {
		height: "100%",
		width: "80%",
		marginLeft: 10,
	},
	scrollView: {
		height: "70%",
		marginTop: 10,
	},
	ListContainer: {
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 30,
		paddingTop: 10,
	},
})

export default Search;
