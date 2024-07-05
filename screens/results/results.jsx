import React, { useEffect, useContext } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import { colors } from "../../utils/colors";
import { Image } from "react-native-elements";
import { useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import { useIsFocused } from "@react-navigation/native"

function Results({route}) {
    const { detectedObject } = route.params;
    const { width } = Dimensions.get('window');
    const { isView, setIsView } = useState();
	return (
		<SafeAreaView style={{ height: "100%", backgroundColor: colors.white }}>
			<ScrollView >
				<View style={styles.wishListContainer}>
					<View style={styles.container}>
						<Image source={require('../../assets/img_chef.png')} 
							style={{
								width: width, 
								flex: 1,
								height: 300,
							}}
							resizeMode="contain"/>
					</View>

					<View>
						<Text style={styles.text}>Kết quả nhận diện</Text>
						<View style={{flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between"}}>
							<View style={styles.containerResult}>
								<Image source={require('../../assets/img_beef.png')} 
									style={styles.resultImage}
									resizeMode="contain"/>
								<TextInput
									style={[styles.inputField, styles.inputBeef]}
									placeholder='Thịt bò'
									keyboardType='text'
									editable={false}
								/>
							</View>
							<View style={styles.containerResult}>
								<Image source={require('../../assets/img_fish.png')} 
									style={[styles.resultImage, {marginLeft: 10}]}
									resizeMode="contain"/>
                                
								<TextInput
									style={[styles.inputField, styles.inputFish]}
									placeholder='Cá'
									keyboardType='text'
									editable={false}
								/>
							</View>
						</View>
					</View>

                    <View>
						<Text style={styles.text}>Gợi ý món ăn</Text>
						
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	wishListContainer: {
		backgroundColor: colors.white,
		paddingHorizontal: 30,
		paddingTop: 10,
		paddingBottom: 100,
	},
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    containerResult: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    resultImage: {
        width: 50, 
        height: 60,
    },
    inputField: {
        flex: 1,
        paddingLeft: 35, 
        // paddingRight: 15, 
        height: 30,
        borderWidth: 1, 
        borderRadius: 20,
    },
    inputBeef: {
        borderColor: colors.red, 
        backgroundColor: colors.superLightRed,
    },
    inputFish: {
        borderColor: colors.blue,  
        backgroundColor: colors.superLightBlue,
    }
});

export default Results;

