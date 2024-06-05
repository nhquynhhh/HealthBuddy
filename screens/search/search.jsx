import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import FoodList from "../food_list/food_list";
import NoResults from "../no_results/no_results";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../utils/colors";
import { AuthContext } from '../../context/AuthContext';
import { set } from "date-fns";
import { handleGetDishList } from "../../services/dish/get_all_dishes";
import {handleGetAllIngredients} from "../../services/ingredients/get_all_ingredients";
import { CardDishComponent } from "../CardDishComponent";
import GradientCircleNextButton from "../GradientCircleNextButton";
import GradientCirclePreviousButton from "../GradientCirclePreviousButton";

function Search() {
	const { dishes, setDishes } = useContext(AuthContext);
	const { ingredients, setIngredients } = useContext(AuthContext);
	const [ListItems, setListItems] = useState([]);
	const [listDishes, setListDishes] = useState([]);
	const [listIngredients, setListIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDish, setIsDish] = useState(true);
	const [isIngredient, setIsIngredient] = useState(false);
	const [isSearchQuery, setSearchQuery] = useState("");

	const [pagination, setPagination] = useState({
		current_page: 1,
		page_size: 10,
		total_items: 0,
		total_pages: 0,
	});

	useEffect(() => {
		getDishList();
	}, []);

	useEffect(() => {
		getDishList();
	}, [pagination.current_page]);


	useEffect(() => {
		if (isDish) {
			getDishList();
		} else {
			getIngredientsList();
		}
	}, [isDish, isIngredient]);


	const getDishList = async () => {
		setIsLoading(true);
		const { current_page, page_size } = pagination;
		if (isDish) {
			const response = await handleGetDishList(current_page, page_size);
			setListItems(response.dishes);
			setPagination(response.pagination);
		}
		setIsLoading(false);
	}

	const getIngredientsList = async () => {
		setIsLoading(true);
		if (isIngredient) {
			const response = await handleGetAllIngredients();
			setListItems(response);
		}
		setIsLoading(false);
	
	}

	const handleSearch = (text) => {
		setSearchQuery(text);
	};

	const filteredWishListItems = ListItems.filter(item =>
		item.name.toLowerCase().includes(isSearchQuery.toLowerCase())
	);

	return (
		<View style={{ height: "100%", backgroundColor: colors.white }}>
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
								// <FoodList key={item.id} FoodList={item} Dish={isDish ? true : false} />
								<CardDishComponent key={item.id} dish={item} />
							))
						) : isSearchQuery ? (
							<NoResults height={400} />
						) : (
							ListItems.map((item) => (
								<FoodList key={item.id} FoodList={item} Dish={isDish ? true : false} />
							))
						)}
					</View>
				)}
			</ScrollView>
			<View style={{paddingBottom: 100}}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                {pagination.current_page > 1 && isDish && (
                    <GradientCirclePreviousButton 
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page - 1,
                        }))}
                        colors={['#FF1E3F', '#FF7E06']}
                    />
                )}
                {pagination.current_page && isDish &&
                    <Text style={{fontWeight: "bold"}}>Trang {pagination.current_page}</Text>
                    }
                {pagination.current_page < pagination.total_pages && isDish && (
                    <GradientCircleNextButton
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page + 1,
                        }))}
                        colors={['#FF1E3F', '#FF7E06']}
                    /> 
                )}
            </View>
			</View>
		</View>
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
		// display: "flex",
		// flexWrap: "wrap",
		// flexDirection: "row",
		// justifyContent: "space-between",
		// paddingHorizontal: 30,
		// paddingTop: 10,
		display: "flex", flexDirection: "row", gap: 15, flexWrap: "wrap", padding: 10
	},
})

export default Search;
