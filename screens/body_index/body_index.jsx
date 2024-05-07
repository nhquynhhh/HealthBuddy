import { useNavigation } from "@react-navigation/native";
import React, {useContext} from "react";
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView, Image} from "react-native";
// import Header from "./header";
import { colors } from "../../utils/colors";
import { Icon } from "react-native-elements";
import { AuthContext } from '../../context/AuthContext';


function BodyIndex({user}) {
	const { userInfo, account } = useContext(AuthContext);
    user = {
        age: userInfo.age,
        weight: userInfo.weight,
        height: userInfo.height,
        gender: userInfo.gender == 'male' ? 'nam' : 'nữ',
    }
    const BMI = (user?.weight/((user?.height*user?.height)/10000)).toFixed(1);
    let energy;
    if(user?.gender == "nam"){
        energy = (6.25 * user?.height) + (10 * user?.weight) - (5 * user?.age) + 5;
    }else {
        energy = (6.25 * user?.height) + (10 + user?.weight) - (5 * user?.age) - 161;

    }
    let Evaluate;
    switch (true) {
        case BMI < 18.5:
            Evaluate = 'Thiếu cân';
            break;
        case BMI >= 18.5 && BMI < 25:
            Evaluate = 'Bình thường';
            break;
        case BMI >= 25 && BMI < 30:
            Evaluate = 'Thừa cân';
            break;
        case BMI >= 30 && BMI < 35:
            Evaluate = 'Béo phì độ I';
            break;
        case BMI >= 35:
            Evaluate = 'Béo phì độ II';
            break;
        default:
          Evaluate = 'Thông số chưa chính xác';
      }
    const navigation = useNavigation();
    const onPressHandler = (title) => {
        navigation.navigate(title);
    }
    return ( 
        <SafeAreaView style={{height: "100%", backgroundColor: colors.white}}>
            <View style={styles.BodyContainer}>
                <Image source={require('../../assets/img_body.png')} style={{width: 40, height: 100, marginRight: 30}}/>
                <View>
                    <Text>
                        <Text style={styles.Text}>Tuổi: </Text>
                        <Text>{user?.age} tuổi</Text>
                    </Text>
                    <Text>
                        <Text style={styles.Text}>Chiều cao: </Text>
                        <Text>{user?.height} cm</Text>
                    </Text>
                    <Text>
                        <Text style={styles.Text}>Cân nặng: </Text>
                        <Text>{user?.weight} kg</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.ContainerIngredient}>
                <View style={styles.ContainerItem}>
                    <Text style={styles.Text}>Chỉ số khối của cơ thể (BMI)</Text>
                    <TouchableOpacity
                        onPress={()=>onPressHandler("BMI")}
                        style={{position: "absolute", right: 8, top: 8}}
                    >
                        <Icon
                            name="questioncircleo"
                            type="ant-design"
                            size={15}
                            color={colors.gray}
                        />
                    </TouchableOpacity>
                    <View style={styles.alignItems}>
                        <Text 
                        style={styles.textIndex}
                        >
                            {BMI}</Text>
                        <Text>
                            <Text>Đánh giá: </Text>
                            <Text style={styles.Text}>{Evaluate}</Text>
                        </Text>
                    </View>
                </View> 
            </View>
            <View style={styles.ContainerIngredient}>
                <View style={styles.ContainerItem}>
                    <Text style={styles.Text}>Năng lượng cần mỗi ngày</Text>
                    <TouchableOpacity
                        onPress={()=>onPressHandler("Energy")}
                        style={{position: "absolute", right: 8, top: 8}}
                    >
                        <Icon
                            name="questioncircleo"
                            type="ant-design"
                            size={15}
                            color={colors.gray}
                        />
                    </TouchableOpacity>
                    <View style={styles.alignItems}>
                        <Text style={styles.textIndex}>{energy}</Text>
                        <Text>calories</Text>
                    </View>
                </View>    
            </View>
            <View style={styles.ContainerIngredient}>
                <View style={styles.ContainerItem}>
                    <Text style={styles.Text}>Lượng nước nên uống mỗi ngày</Text>
                    <View style={styles.alignItems}>
                        <Text style={styles.textIndex}>2000</Text>
                        <Text>ml</Text>
                    </View>
                    <TouchableOpacity
                        // onPress={()=>onPressHandler("BMI")}
                        style={{justifyContent:"center", alignItems: "center", flexDirection: "row"}}
                    >
                        <Icon
                                name="access-alarm"
                                type="material-icons"
                                size={25}
                                color={colors.red}
                                style={{paddingRight: 10}}
                        />
                        <Text style={{color: colors.red}}>
                            Bật nhắc nhở uống nước
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>   
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    ContainerIngredient: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap",
        marginTop: 20,
        paddingHorizontal: 20,
        
    },
    ContainerItem: {
        backgroundColor: colors.white,
        height: "auto",
        borderRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        padding: 10, 
        marginVertical: 10,
    },
    BodyContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
        right: "5%"
    },
    Text: {
        fontWeight: "bold",
        fontSize: 15
    },
    alignItems: {
        alignItems: "center",
    },
    textIndex: {
        color: colors.blue,
        fontWeight: "bold",
        fontSize: 20,
        padding: 5,
    }
});

export default BodyIndex;