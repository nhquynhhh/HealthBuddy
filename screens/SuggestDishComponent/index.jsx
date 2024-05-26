import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from "react";
import { CardDishComponent } from '../../screens/CardDishComponent/index'
import { Icon, Button, Divider } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import GradientCircleNextButton from '../../screens/UI/GradientCircleNextButton/index';
import GradientCirclePreviousButton from '../../screens/UI/GradientCirclePreviousButton/index';
import { Ionicons } from '@expo/vector-icons';
import { handleRecommendDish } from '../../services/dish/get_all_dishes';
import { colors } from '../../utils/colors';

export const SuggestDishComponent = () => {

    const navigation = useNavigation();
    const [category, setCategory] = useState("")
    const [rcmDishData, setRcmDishData] = useState([])
    const [pagination, setPagination] = useState({
        current_page: 1,
        page_size: 4,
        total_items: 0,
        total_pages: 0,
    })
    const END_LINEAR_COLOR = colors.blue;


    const fetchRcmDishData = async () => {
        const { current_page, page_size } = pagination;
        const res = await handleRecommendDish(current_page, category)
        if (res) {
            setRcmDishData(res.data);
            setPagination(res.pagination); 
        }
    }

    useEffect(() => {
         fetchRcmDishData();
    }, [pagination.current_page, category]);

    // if (loading) {
    //     return <View><ActivityIndicator size="large" color="#0000ff" /></View>   
    // }

    return (
        <View style={{padding: 15}}>
            <Divider style={{marginBottom: 20}}></Divider>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.blue, alignSelf: 'center'}}>CÓ THỂ BẠN SẼ THÍCH </Text>
                <Icon name='yelp' type='entypo' color={colors.lightOrange}/>
            </View>
             <View style={{display: "flex", flexDirection: "row", gap: 5, marginVertical: 15, flexWrap: "wrap", alignSelf: 'center', paddingHorizontal: 15, justifyContent: 'space-around'}}>
                <TouchableOpacity style={{ backgroundColor: category === "" ? END_LINEAR_COLOR : colors.darkGray, 
                paddingHorizontal: 15, borderRadius: 50, paddingVertical: 6 }} onPress={() => setCategory("")}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: 'center'}}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Grains" ? END_LINEAR_COLOR : colors.darkGray, 
                paddingHorizontal: 15, borderRadius: 50, paddingVertical: 6}} onPress={() => setCategory("Grains")}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: 'center'}}>Nhóm tinh bột</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Protein" ? END_LINEAR_COLOR : colors.darkGray, 
                paddingHorizontal: 15, borderRadius: 50, paddingVertical: 6}} onPress={() => setCategory("Protein")}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: 'center'}}>Nhóm giàu đạm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Vegetables" ? END_LINEAR_COLOR : colors.darkGray, 
                paddingHorizontal: 15, borderRadius: 50, paddingVertical: 6}} onPress={() => setCategory("Vegetables")}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: 'center'}}>Canh và rau</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Dairy" ? END_LINEAR_COLOR : colors.darkGray, 
                paddingHorizontal: 15, borderRadius: 50, paddingVertical: 6}} onPress={() => setCategory("Dairy")}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: 'center'}}>Nhóm sữa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Fruits" ? END_LINEAR_COLOR : colors.darkGray, 
                paddingHorizontal: 15, borderRadius: 50, paddingVertical: 6}} onPress={() => setCategory("Fruits")}>
                    <Text style={{color: "white", fontWeight: "bold", alignSelf: 'center'}}>Trái cây</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list_item}>
                {rcmDishData.length ? rcmDishData.map((dish) => { return (
                        <CardDishComponent
                            key={dish.id}
                            dish = {dish}/>
                    )})
                : 
                <Text style={{fontSize: 15, textAlign: 'justify'}}>Hãy thêm món ăn vào danh sách yêu thích để <Text style={{color: colors.blue, fontWeight:'bold', fontSize: 16}}>HealthBuddy</Text> có thể gợi ý món ăn cho bạn nhé! 👩🏼‍🍳🧑🏼‍🍳</Text>}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, alignItems: "center" }}>
                {pagination.current_page === 1 && (
                    <Button title={" Quay lại"}
                        disabled={true}
                        icon={{ name: 'leftcircleo', type: 'antdesign', color: colors.white, size: 16 }}
                        disabledTitleStyle={{ fontWeight: 'bold', fontSize: 14, color: colors.white }}
                        buttonStyle={{ width: 100, height: 40, borderRadius: 50,}}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                        colors: [colors.gray, colors.darkGray],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                        }}>
                  </Button>
                )}
                {pagination.current_page > 1 && (
                    <GradientCirclePreviousButton 
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page - 1,
                        }))}
                    />
                )}
                {pagination.current_page && 
                    <Text style={{fontWeight: "bold", fontSize: 16}}>Trang {pagination.current_page}</Text>
                    }
                {pagination.current_page < pagination.total_pages && (
                    <GradientCircleNextButton
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page + 1,
                        }))}
                    /> 
                )}
                {pagination.current_page === pagination.total_pages && (
                    <Button title={"Tiếp theo "}
                        disabled={true}
                        iconRight
                        style={styles.btnClick}
                        icon={{ name: 'rightcircleo', type: 'antdesign', color: colors.white, size: 16 }}
                        disabledTitleStyle={{ fontWeight: 'bold', fontSize: 14, color: colors.white }}
                        buttonStyle={{ width: 100, height: 40, borderRadius: 50,}}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                        colors: [colors.gray, colors.darkGray],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                        }}>
                  </Button>
                )}
            </View>

            <View style={{height: 150}}></View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    list_item: {
        display: "flex", flexDirection: "row", gap: 20, marginHorizontal: 5, marginTop: 20, 
        marginBottom: 40, flexWrap: "wrap"
    },
})