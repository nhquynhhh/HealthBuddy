import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View, Text, SafeAreaView, TouchableOpacity, Keyboard} from "react-native";
import FoodList from "../food_list/food_list";
import NoResults from "../no_results/no_results";
import { Button, Icon } from "react-native-elements";
import { colors } from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
function MenuSuggestion() {
    const ListItems = [
        { 
            dish: {
                id: 1, 
                img: "https://www.thatlangon.com/wp-content/uploads/2020/04/spaghetti-bolognese-106560-1-scaled.jpeg",
                name: "Dish 1", 
                calo: 100, 
                protein: 10, 
                carb: 20, 
                fat: 5,
                nameingredient: "Trứng"
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
                fat: 6,
                nameingredient: "Cá"
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
                fat: 7,
                nameingredient: "Rau"
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
                fat: 8,
                nameingredient: "Thịt"
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
                fat: 8,
                nameingredient: "Gạo"
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
                fat: 8,
                nameingredient: "Miến"

            } 
        },
    ];
    const [isSearchQuery, setSearchQuery] = useState("");
    const [CheckList, setCheckList] = useState(false);
    const [filteredListItems, setFilteredListItems] = useState([]);
    const [ListSearch, setListSearch] = useState([]);
    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const handleSuggestion = () => {
      if (isSearchQuery.trim() !== "") {
          const filteredItems = ListItems.filter(item =>
              item.dish.nameingredient.toLowerCase().includes(isSearchQuery.toLowerCase())
          );
          setFilteredListItems(filteredItems);
          setCheckList(true);
          setListSearch(prevListSearch => [...prevListSearch, isSearchQuery]);
      } else {
        setCheckList(false);
      }
      Keyboard.dismiss();
    };
    

    return ( 
        <SafeAreaView  style={{height: "100%", backgroundColor: colors.white, paddingBottom: 100}}>
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Icon 
                        name="search" 
                        size={24} 
                        color="black" 
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập tên nguyên liệu..."
                        onChangeText={handleSearch}
                        value={isSearchQuery}
                    />
                </View>
            </View>
            <View style={styles.SuggestContainer}>
              {ListSearch?.map((item, index) => (
                <View key={index} style={styles.IngredientSuggest}>
                  <TouchableOpacity style={{marginRight: 15}}
                    onPress={() =>{
                      setSearchQuery(item);
                    }}
                  >
                    <Text>{item}</Text> 
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setListSearch(prevListSearch => prevListSearch.filter((_, idx) => idx !== index));
                    }}
                  >
                    <Icon
                        name="closecircleo"
                        type="ant-design"
                        size={15}
                        color={colors.gray}
                    />
                  </TouchableOpacity>
              </View>
              ))} 
            </View>
            <View>
                <Button 
                    title="GỢI Ý" 
                    titleStyle={{fontWeight:'700', fontSize: 20, color:colors.white}}
                    buttonStyle={{ 
                        width: "100%", 
                        height: 45, 
                        borderRadius: 20,
                    }}
                    containerStyle={{margin: 20}}
                    ViewComponent={LinearGradient}
                    linearGradientProps={{ 
                        colors: [colors.blue, colors.lightBlue],
                        start: { x: 0, y: 0.5 }, 
                        end: { x: 1, y: 0.5 } 
                    }} 
                    onPress={handleSuggestion}
                />
            </View>
            <View style={{alignItems: "center"}}>
              <View style={styles.horizontalLine}></View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.ListContainer}>
                    {filteredListItems .length > 0 ? filteredListItems.map((item) => (
                        <FoodList key={item.dish.id} FoodList={item.dish} />
                    )) : CheckList ? <NoResults height={290}/> :
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
    
    SuggestContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        paddingBottom: 50,
    },
    IngredientSuggest: {
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D8D8D8",
        margin: 10,
        padding: 5,
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
    horizontalLine: {
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
      width: "60%",
      marginTop: 10,

  }
})

export default MenuSuggestion;
