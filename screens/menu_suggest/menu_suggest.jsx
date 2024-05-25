import React, { Component, useState, useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, SafeAreaView, TouchableOpacity, Keyboard} from "react-native";
import FoodList from "../food_list/food_list";
import NoResults from "../no_results/no_results";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { handleGetSuggestMenu, handleNewGeneticAlgorithm } from '../../services/menu/menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tab, TabView } from '@rneui/themed';
import { CardDishComponent } from '../../screens/CardDishComponent/index'

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

    const fetchMenuData = async () => {
        const res = await handleGetSuggestMenu()
        // console.log(res)
        if (res && res.fitness_score) {
            setMorningToday(res.morning_dishs)
            setLunchToday(res.noon_dishs)
            setDinnerToday(res.dinner_dishs)
            setSnackToday(res.snacks)            
            setFitnessScore(res.fitness_score)
            setTotalcalo(res.calo)
        }
        else if (res) {
            newMenu()
        }
        else {
            console.log('Token expired');
            setVisible2(true);
        }
    }
    useEffect(() => {
        fetchMenuData()
    }, [])
    
    const newMenu = async () => {
        const new_menu = await handleNewGeneticAlgorithm()
        const new_res = await handleGetSuggestMenu()
        setMorningToday(new_res.morning_dishs)
        setLunchToday(new_res.noon_dishs)
        setDinnerToday(new_res.dinner_dishs)
        setSnackToday(new_res.snacks)
        setFitnessScore(new_res.fitness_score)
        setTotalcalo(new_res.calo)
    }



    return (
        <View>
            <View style={{marginBottom: 10, display: "flex", flexDirection: "row", 
            justifyContent: "space-between", alignItems: "center"}}>
                <View>
                    <Text>Điểm thực đơn: {fitnessScore}</Text>
                    <Text>calo: {totalcalo}</Text>
                </View>
                
                <TouchableOpacity style={{ backgroundColor: END_LINEAR_COLOR, 
                    padding: 10, borderRadius: 50, display: "flex", flexDirection: "row", 
                    alignItems: "center", gap: 5 }} onPress={newMenu}>
                    <MaterialCommunityIcons name="reload" size={24} color="white" />
                    <Text style={{color: "white", fontWeight: "bold"}}>Thực đơn khác</Text>
                </TouchableOpacity>
            </View>
            <Tab value={indexMeal} onChange={(e) => setIndexMeal(e)}
                indicatorStyle={{ backgroundColor: 'white', height: 3,}}
                style={{backgroundColor: END_LINEAR_COLOR, marginVertical: 20}}
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
            <View style={{marginBottom: 10}}>
                <View style={styles.list_item}>
                    {morningToday && indexMeal === 0 && morningToday.map((dish, index) => { return (
                        <CardDishComponent key={index} dish = {dish}/> )})}
                </View>
                <View style={styles.list_item}>
                    {lunchToday && indexMeal === 1 && lunchToday.map((dish, index) => { return (
                        <CardDishComponent key={index} dish = {dish}/> )})}
                </View>
                <View style={styles.list_item}>
                    {dinnerToday && indexMeal === 2 && dinnerToday.map((dish, index) => { return (
                        <CardDishComponent key={index} dish = {dish}/> )})}
                </View>
                <View style={styles.list_item}>
                    {snackToday && indexMeal === 3 && snackToday.map((dish, index) => { return (
                        <CardDishComponent key={index} dish = {dish}/>)})}
                </View>
            </View>

            
        </View>
    )
}
const styles = StyleSheet.create({
    
    container: {
        paddingHorizontal: 5, paddingTop: 10,
    },
    list_item: {
        display: "flex", flexDirection: "row", gap: 15, marginHorizontal: 5, flexWrap: "wrap"
    },
})

export default MenuSuggestion;
