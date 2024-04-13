import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text, SafeAreaView} from "react-native";
import FoodList from "../food_list/food_list";
import NoResults from "../no_results/no_results";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../colors";
function Search() {
    const ListItems = [
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
                name: "Dish 5", 
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
                name: "Dish 6", 
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
                name: "Dish 7", 
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
                name: "Dish 8", 
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
                name: "Dish 9", 
                calo: 140, 
                protein: 18, 
                carb: 28, 
                fat: 8 
            } 
        },
        { 
            dish: {
                id: 10, 
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 10", 
                calo: 140, 
                protein: 18, 
                carb: 28, 
                fat: 8 
            } 
        },
    ];
    const [isPressed, setIsPressed] = useState(false);
    const [isSearchQuery, setSearchQuery] = useState("");

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    // Lọc danh sách món ăn dựa trên giá trị tìm kiếm
    const filteredWishListItems = ListItems.filter(item =>
        item.dish.name.toLowerCase().includes(isSearchQuery.toLowerCase())
    );

    return ( 
        <SafeAreaView  style={{height: "100%", backgroundColor: colors.white}}>
            <View style={styles.btnContainer}>
                <Button title={"Nguyên liệu"} 
                    titleStyle={{fontWeight:'700', fontSize: 12,
                    color:isPressed ? colors.white : colors.black}}
                    buttonStyle={{width: 100, height: 45, borderRadius: 20, 
                        backgroundColor:isPressed ? colors.lightBlue : colors.gray}}
                    containerStyle={{marginLeft: 30, marginRight: 15}}
                    onPressIn={() => setIsPressed(true)}
                    >
                </Button>
                <Button title={"Món ăn"} 
                    titleStyle={{fontWeight:'700', fontSize: 12,
                    color:isPressed ? colors.black : colors.white}}
                    buttonStyle={{width: 80, height: 45, borderRadius: 20,
                        backgroundColor:isPressed ? colors.gray : colors.lightBlue}}
                    containerStyle={{ }}
                    onPressIn={() => setIsPressed(false)}>
                </Button>
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
            <ScrollView style={styles.scrollView}>
                <View style={styles.ListContainer}>
                    {filteredWishListItems .length > 0 ? filteredWishListItems.map((item) => (
                        <FoodList key={item.dish.id} FoodList={item.dish} />
                    )) : isSearchQuery ? <NoResults /> :
                    ListItems.map((item) => (
                        <FoodList key={item.dish.id} FoodList={item.dish} />
                    ))
                    }
                </View>
               
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
    searchContainer:{
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
    noResultsContainer: {

    }
})

export default Search;
