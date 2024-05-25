import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CardDishComponent = ({id, dish}) => {

    const navigation = useNavigation();
    const data = { dish };
    return (
        <TouchableOpacity style={styles.dish} onPress={() => navigation.push('DetailDish', {data})}>
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
  