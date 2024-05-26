import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from "react";
import { CardDishComponent } from '../../screens/CardDishComponent/index'
import { useNavigation } from '@react-navigation/native'
import GradientCircleNextButton from '../../screens/UI/GradientCircleNextButton/index';
import GradientCirclePreviousButton from '../../screens/UI/GradientCirclePreviousButton/index';
import { Ionicons } from '@expo/vector-icons';
import { handleRecommendDish } from '../../services/dish/get_all_dishes';


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
    const END_LINEAR_COLOR = '#FF7E06';


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
        <View>
           <Text style={{fontWeight: "bold", fontSize: 16, textTransform: 'uppercase',
            color: END_LINEAR_COLOR}}>CÓ THỂ BẠN SẼ THÍCH</Text>
             <View style={{display: "flex", flexDirection: "row", gap: 5, marginVertical: 10, flexWrap: "wrap"}}>
                <TouchableOpacity style={{ backgroundColor: category === "" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6 }} onPress={() => setCategory("")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Grains" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Grains")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm tinh bột</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Protein" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Protein")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm giàu đạm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Vegetables" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Vegetables")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Canh và rau</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Dairy" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Dairy")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Nhóm sữa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: category === "Fruits" ? END_LINEAR_COLOR : '#D9D9D9', 
                paddingHorizontal: 10, borderRadius: 50, paddingVertical: 6  }} onPress={() => setCategory("Fruits")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Trái cây</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list_item}>
                {rcmDishData.length ? rcmDishData.map((dish) => { return (
                        <CardDishComponent
                            key={dish.id}
                            dish = {dish}/>
                    )})
                : 
                <Text>Thêm danh sách yêu thích để MenuMate có thể gợi ý món ăn cho bạn</Text>}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 50, alignItems: "center" }}>
                {pagination.current_page > 1 && (
                    <GradientCirclePreviousButton 
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page - 1,
                        }))}
                        colors={['#FF1E3F', '#FF7E06']}
                    />
                )}
                {pagination.current_page && 
                    <Text style={{fontWeight: "bold"}}>Trang {pagination.current_page}</Text>
                    }
                {pagination.current_page < pagination.total_pages && (
                    <GradientCircleNextButton
                        onPress={() => setPagination((prev) => ({
                            ...prev,
                            current_page: prev.current_page + 1,
                        }))}
                        colors={['#FF1E3F', '#FF7E06']}
                    /> 
                    
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