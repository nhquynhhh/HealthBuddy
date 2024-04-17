import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from "react-native";
import { colors } from "../../utils/colors";

function BMI() {
    return ( 
        <ScrollView style={{height: "100%",  backgroundColor: colors.white}}>
            <View style={styles.BmiContainer}>
                <Text style={styles.BmiText}>
                    Chỉ số BMI còn được gọi là chỉ số khối của cơ thể (Body Mass Index). 
                    Dựa vào chỉ số BMI của một người có thể biết được người đó béo,
                    gầy hay có cân nặng lý tưởng.
                </Text>
                <Text style={styles.BmiHeader6}>Công thức tính BMI</Text>
                <View style={styles.alignItems}>
                    <Image source={require('../../assets/img_formula.png')} />
                </View>
                <Text style={styles.BmiText}>
                    Trong đó, cân nặng tính theo đơn vị kilogram (kg), chiều cao tính theo đơn vị mét (m)
                </Text>
                <Text style={styles.BmiHeader6}>Đánh giá chỉ số BMI</Text>
                <View style={styles.alignItems}>
                    <Image source={require('../../assets/img_bmi_info.jpg')}
                     resizeMode="contain"
                     style={{width: "100%", height: 150}}/>
                </View>
                <Text style={styles.BmiText}>BMI {"<"} 18.5: Thiếu cân {"\n"}
                18.5 {"<="} BMI {"<="} 24.9: Bình thường {"\n"}
                25.0 {"<="} BMI {"<="} 29.9: Thừa cân {"\n"}
                30.0 {"<="} BMI {"<="} 34.9: Béo phì độ I {"\n"}
                BMI {">"} 35.0: Béo phì độ II</Text>
            </View>
        </ScrollView>
     );
}
const styles = StyleSheet.create({
    BmiContainer: {
        padding: 20,
        paddingBottom: 100
    },
    BmiText: {
        fontSize: 14,
        paddingBottom: 20,
        lineHeight: 25,
    },
    BmiHeader6: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.blue,
        paddingBottom: 10,
    },
    alignItems: {
        alignItems: 'center',
        paddingBottom: 20,
    },
})
export default BMI;