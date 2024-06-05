import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleGetFavoriteDishes } from '../../services/favorite/get_favorite_dishes';
import { handleGetRecipeByDishID } from "../../services/recipe/get_recipe_by_dish_id";
import { AuthContext } from "../../context/AuthContext";
import { save_calories_morning, save_calories_lunch, save_calories_dinner, save_calories_snack } from '../../services/api/api_save_calories';

export const CardDishComponent = ({ id, dish }) => {
    const { userInfo } = useContext(AuthContext);
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);

    const onPressHandler = async () => {
        const recipe = await handleGetRecipeByDishID(dish?.id);
        const response = await handleGetFavoriteDishes(userInfo?.id);
        navigation.navigate("FoodDetails", { data: dish, recipe, favoriteDishes: response });
    }

    const onLongPressHandler = () => {
        setShowModal(true);
    }

    const handleSaveCalories = async (mealType) => {
        setShowModal(false);
        try {
            switch (mealType) {
                case 'morning':
                    await save_calories_morning(dish.calo);
                    break;
                case 'lunch':
                    await save_calories_lunch(dish.calo);
                    break;
                case 'dinner':
                    await save_calories_dinner(dish.calo);
                    break;
                case 'snack':
                    await save_calories_snack(dish.calo);
                    break;
                default:
                    throw new Error('Invalid meal type');
            }
        } catch (error) {
            console.error(`Failed to save ${mealType} calories:`, error);
            Alert.alert(`Failed to save ${mealType} calories.`);
        }
    }

    return (
        <TouchableOpacity style={styles.dish} onPress={onPressHandler} onLongPress={onLongPressHandler}>
            <Image style={styles.dish_img} source={require('../../assets/restaurant.png')} />
            <View>
                <Text style={styles.dish_name}>{dish.name}</Text>
                <View style={styles.caloriesContainer}>
                    <Text style={styles.value}>{dish.calo} </Text>
                    <Text style={styles.txt}>calo</Text>
                </View>
            </View>

            <Modal visible={showModal} transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Save Calories</Text>
                        <OptionButton onPress={() => handleSaveCalories('morning')} style={styles.breakfastOption}>
                            Breakfast
                        </OptionButton>
                        <OptionButton onPress={() => handleSaveCalories('lunch')} style={styles.lunchOption}>
                            Lunch
                        </OptionButton>
                        <OptionButton onPress={() => handleSaveCalories('dinner')} style={styles.dinnerOption}>
                            Dinner
                        </OptionButton>
                        <OptionButton onPress={() => handleSaveCalories('snack')} style={styles.snackOption}>
                            Snack
                        </OptionButton>
                        <OptionButton onPress={() => setShowModal(false)} style={styles.cancelOption}>
                            Cancel
                        </OptionButton>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
};

const OptionButton = ({ onPress, style, children }) => (
    <TouchableOpacity onPress={onPress} style={[styles.option, style]}>
        <Text style={styles.optionText}>{children}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    dish: {
        alignItems: "center",
        paddingVertical: 15,
        width: "46%",
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        position: "relative",
    },
    dish_img: {
        width: "100%",
        height: 90,
        objectFit: "contain"
    },
    dish_name: {
        height: 50,
        paddingHorizontal: 11,
        marginTop: 8,
        fontWeight: "bold",
        fontSize: 15,
        textAlign: 'center'
    },
    caloriesContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    txt: {
        color: "gray",
        fontSize: 12,
        textAlignVertical: 'center'
    },
    value: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#008dda'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    breakfastOption: {
        backgroundColor: '#FFC107', // Màu cam
    },
    lunchOption: {
        backgroundColor: '#4CAF50', // Màu xanh lá cây
    },
    dinnerOption: {
        backgroundColor: '#2196F3', // Màu xanh dương
    },
    snackOption: {
        backgroundColor: '#FF5722', // Màu cam đậm
    },
    cancelOption: {
        backgroundColor: '#FF5252', // Màu đỏ
    },
});
