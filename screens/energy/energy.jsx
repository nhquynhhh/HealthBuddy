import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { colors } from "../../utils/colors";

function Energy() {
    return ( 
        <ScrollView style={{height: "100%",  backgroundColor: colors.white}}>
            <View style={styles.EnergyContainer}>
                <Text style={styles.EnergyText}>
                    <Text style={styles.TextBold}>Calo </Text>là đơn vị dùng để tính hàm lượng năng lượng có sẵn trong các loại thực phẩm.
                </Text>
                <Text style={styles.EnergyText}>
                    Rất nhiều người trong chúng ta không biết 1 ngày cần cung cấp bao nhiêu calo
                     cho cơ thể thì mới đủ. Lượng calo cần thiết của mỗi người là không giống 
                     vì nó phụ thuộc vào các yếu tố
                </Text>
                <Text style={styles.EnergyHeader6}>Cách tính năng lượng cần mỗi ngày bằng công thức công thức Mifflin - St Jeor</Text>
                <Text style={styles.EnergyText}>
                    <Text style={styles.TextBold}>Lượng calo cho nữ giới </Text>= (6.25 × chiều cao tính bằng cm) + (10 × trọng lượng tính bằng kg) - (5 × tuổi tính bằng năm) - 161
                </Text>
                <Text style={styles.EnergyText}>
                    <Text style={styles.TextBold}>Lượng calo cho nam giới </Text>= (6.25 × chiều cao tính bằng cm) + (10 × trọng lượng tính bằng kg) - (5 × tuổi bằng năm) + 5
                </Text>
                <View style={styles.alignItems}>
                    <Image source={require('../../assets/img_explanation.png')}
                     resizeMode="contain"
                     style={{width: "100%"}}/>
                </View>
            </View>
        </ScrollView>
     );
}
const styles = StyleSheet.create({
    EnergyContainer: {
        padding: 20,
        paddingBottom: 100
    },
    EnergyText: {
        fontSize: 14,
        paddingBottom: 20,
        lineHeight: 25,
    },
    TextBold: {
        fontWeight: "bold",
    },
    EnergyHeader6: {
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
export default Energy;