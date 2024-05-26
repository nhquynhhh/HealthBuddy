import React, { Component, useState, useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, SafeAreaView, TouchableOpacity, Keyboard } from "react-native";
import NoResults from "../no_results/no_results";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { handleGetSuggestMenu, handleNewGeneticAlgorithm } from '../../services/menu/menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tab, TabView } from '@rneui/themed';
import { CardDishComponent } from '../../screens/CardDishComponent/index'
import { ActivityIndicator } from 'react-native-paper';

function MenuSuggestion() {

	const [visible2, setVisible2] = useState(false)
	const [fitnessScore, setFitnessScore] = useState(0)
	const [totalcalo, setTotalcalo] = useState(0)
	const [indexMeal, setIndexMeal] = useState(0)
	const [morningToday, setMorningToday] = useState([])
	const [lunchToday, setLunchToday] = useState([])
	const [dinnerToday, setDinnerToday] = useState([])
	const [snackToday, setSnackToday] = useState([])
	const END_LINEAR_COLOR = '#FF7E06';

	const [isLoading, setIsLoading] = useState(false);

	const clearData = () => {
		setMorningToday([])
		setLunchToday([])
		setDinnerToday([])
		setSnackToday([])
		setFitnessScore(0)
		setTotalcalo(0)
	}

	const fetchMenuData = async () => {
		setIsLoading(true)
		const res = await handleGetSuggestMenu()
		// console.log(res)
		if (res && res.fitness_score) {
			setMorningToday(res.morning_dishs)
			console.log(res.morning_dishs)
			setLunchToday(res.noon_dishs)
			setDinnerToday(res.dinner_dishs)
			setSnackToday(res.snacks)
			setFitnessScore(res.fitness_score)
			setTotalcalo(res.calo)
		}
		else if (res) {
			newMenu()
		}
		setIsLoading(false)
	}
	useEffect(() => {
		fetchMenuData()
	}, [])

	const newMenu = async () => {
		clearData();
		setIsLoading(true)
		const new_menu = await handleNewGeneticAlgorithm()
		const new_res = await handleGetSuggestMenu()
		setMorningToday(new_res.morning_dishs)
		setLunchToday(new_res.noon_dishs)
		setDinnerToday(new_res.dinner_dishs)
		setSnackToday(new_res.snacks)
		setFitnessScore(new_res.fitness_score)
		setTotalcalo(new_res.calo)
		setIsLoading(false);
	}

	return (
		<View style={{backgroundColor: colors.white}}>
			<View style={{
				marginBottom: 10, display: "flex", flexDirection: "row",
				justifyContent: "space-between", alignItems: "center",
				marginTop: 30
			}}>
				<View style={{paddingLeft: 20}}>
					<Text style={{fontSize: 16}}><Text style={{fontWeight: 'bold'}}>Điểm thực đơn:</Text> {fitnessScore}</Text>
					<Text style={{fontSize: 16}}><Text style={{fontWeight: 'bold'}}>Calories:</Text> {totalcalo}</Text>
				</View>
				<TouchableOpacity style={{
					backgroundColor: colors.blue,
					padding: 10, borderRadius: 50, display: "flex", flexDirection: "row",
					alignItems: "center", gap: 5, marginRight: 20
				}} onPress={newMenu}>
					<MaterialCommunityIcons name="reload" size={24} color="white" />
					<Text style={{ color: "white", fontWeight: "bold" }}>Thực đơn khác</Text>
				</TouchableOpacity>
			</View>
			<Tab value={indexMeal} onChange={(e) => setIndexMeal(e)}
				indicatorStyle={{ backgroundColor: colors.lightOrange, height: 3, }}
				style={{ backgroundColor: colors.superLightBlue, marginVertical: 20 }}
				variant="primary">
				<Tab.Item title="Sáng" titleStyle={{ fontSize: 12 }}
					icon={{ name: 'sunny', type: 'ionicon', color: 'white' }} />
				<Tab.Item title="Trưa" titleStyle={{ fontSize: 12 }}
					icon={{ name: 'partly-sunny', type: 'ionicon', color: 'white' }} />
				<Tab.Item title="Tối" titleStyle={{ fontSize: 12 }}
					icon={{ name: 'moon', type: 'ionicon', color: 'white' }} />
				<Tab.Item title="Phụ" titleStyle={{ fontSize: 12 }}
					icon={{ name: 'cafe', type: 'ionicon', color: 'white' }} />
			</Tab>
			{isLoading && <ActivityIndicator size="large" color={colors.blue} />}
			<View style={{ marginBottom: 10 }}>
				<View style={{flexDirection: 'row', alignSelf: 'center'}}>
					<Icon name='magic-wand' type='simple-line-icon' color={colors.lightOrange} size={20}/>
					<Text style={{fontSize: 16, marginBottom: 20, marginLeft: 5}}> Thực đơn cho bữa ăn của bạn là: </Text>
				</View>
				<View style={styles.list_item}>
					{morningToday && indexMeal === 0 && morningToday.map((dish, index) => {
						return (
							<CardDishComponent key={index} dish={dish} />)
					})}
				</View>
				<View style={styles.list_item}>
					{lunchToday && indexMeal === 1 && lunchToday.map((dish, index) => {
						return (
							<CardDishComponent key={index} dish={dish} />)
					})}
				</View>
				<View style={styles.list_item}>
					{dinnerToday && indexMeal === 2 && dinnerToday.map((dish, index) => {
						return (
							<CardDishComponent key={index} dish={dish} />)
					})}
				</View>
				<View style={styles.list_item}>
					{snackToday && indexMeal === 3 && snackToday.map((dish, index) => {
						return (
							<CardDishComponent key={index} dish={dish} />)
					})}
				</View>
			</View>
			<View style={{height: 1000}}></View>
		</View>
	)
}
const styles = StyleSheet.create({

	container: {
		paddingHorizontal: 5, paddingTop: 10,
	},
	list_item: {
		display: "flex", flexDirection: "row", gap: 15, marginHorizontal: 5, flexWrap: "wrap", marginLeft: 15
	},
})

export default MenuSuggestion;
