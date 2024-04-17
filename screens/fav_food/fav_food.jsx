import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Foodlist from "../food_list/food_list"
import { colors } from "../../colors";

function FavouriteFood() {
     wishListItems = [
        { 
            dish: {
                id: 1, 
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 1", 
                calo: 100, 
                protein: 10, 
                carb: 20, 
                fat: 5 
            } 
        },
        { 
            dish: {
                id: 2,
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 2", 
                calo: 120, 
                protein: 12, 
                carb: 22, 
                fat: 6 
            } 
        },
        { 
            dish: {
                id: 3, 
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 3", 
                calo: 130, 
                protein: 15, 
                carb: 25, 
                fat: 7 
            } 
        },
        { 
            dish: {
                id: 4, 
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 4", 
                calo: 140, 
                protein: 18, 
                carb: 28, 
                fat: 8 
            } 
        },
        { 
            dish: {
                id: 5, 
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 4", 
                calo: 140, 
                protein: 18, 
                carb: 28, 
                fat: 8 
            } 
        },
        { 
          dish: {
              id: 6, 
              img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
              name: "Dish 4", 
              calo: 140, 
              protein: 18, 
              carb: 28, 
              fat: 8 
          } 
        },
        { 
          dish: {
              id: 7, 
              img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
              name: "Dish 4", 
              calo: 140, 
              protein: 18, 
              carb: 28, 
              fat: 8 
          } 
        },
        { 
          dish: {
              id: 8, 
              img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
              name: "Dish 4", 
              calo: 140, 
              protein: 18, 
              carb: 28, 
              fat: 8 
          } 
        }, 
        { 
          dish: {
              id: 9, 
              img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
              name: "Dish 4", 
              calo: 140, 
              protein: 18, 
              carb: 28, 
              fat: 8 
          } 
        },
    ];
    return ( 
        <ScrollView>
            <View style={styles.wishListContainer}>
                {wishListItems.map((item) => (
                    <Foodlist key={item.dish.id} FoodList={item.dish} />
                ))}
            </View>
        </ScrollView>
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
