import React, { useEffect, useState,useContext } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleGetRecipeByDishID } from "../../services/recipe/get_recipe_by_dish_id";
import { AuthContext } from "../../context/AuthContext";
import { handleGetFavoriteDishes } from '../../services/favorite/get_favorite_dishes';


export const CardDishComponent = ({id, dish}) => {

    const navigation = useNavigation();
    const { userInfo } = useContext(AuthContext);
    const data = { dish };
    const onPressHandler = async () => {
		if (!dish) return;
		const recipe = await handleGetRecipeByDishID(dish.id);
		const response = await handleGetFavoriteDishes(userInfo.id);
		navigation.navigate("FoodDetails", { data: dish, recipe: recipe, favoriteDishes: response });
	}

    return (
        <TouchableOpacity style={styles.dish} onPress={onPressHandler}>
            <Image style={styles.dish_img} source={require('../../assets/restaurant.png')}/>
            <View>
                <Text style={styles.dish_name}>{dish.name}</Text>
                <View style={{display: "flex", flexDirection:"row", justifyContent: "space-around"}}>
                    <View style={{display: "flex", flexDirection:"row", alignItems: "center"}}>
                        <Text style={styles.value}>{dish.calo} </Text>
                        <Text style={styles.txt}>calo</Text>
                    </View>
                </View>
               
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dish: {
        alignItems: "center", paddingVertical: 15,
        width: "47%", borderRadius: 12, backgroundColor: 'white', shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 4, elevation: 5, position: "relative"
    },
    dish_img: {
        width: "100%", height: 90, objectFit: "contain"
    },
    dish_name: {
        height: 40, paddingHorizontal: 11, marginTop: 8, fontWeight: "bold", 
        fontSize: 16,
    },
    txt: {
        color: "gray", fontSize: 12
    },
    value: {
        fontWeight: 'bold', fontSize: 16, color: '#1A8C03'
    },
    add:{
        position:'absolute', right: 10, bottom: 10,
    },
    
  });
  