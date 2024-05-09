import React from "react";
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions} from "react-native";
import {useNavigation} from "@react-navigation/native"
import { colors } from "../../utils/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon } from "react-native-elements";

function Change() {

    return ( 
        <>
        <TouchableOpacity

        ><Text>Thay đổi</Text></TouchableOpacity>
        <Modal
				visible={isFormVisible}
				animationType="slide"
				transparent={true}
			>
				<View style={styles.modalContainer}>
					<View>
						<TouchableOpacity onPress={closeModal}
							style={{position: "absolute", right: 100, top: 8}}>
							<Icon 
							name="close" 
							type="antdesign" size={25} 
							color={colors.red} 
							/>
						</TouchableOpacity>
					</View>
					<View style={styles.modalContent}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<Text style={{ fontWeight: 'bold', fontSize: RFValue(15, 720) }}>Mục tiêu của bạn</Text>
						</View>
						<Text style={{ marginVertical: 10 }}>...</Text>
						<Text style={{ fontSize: RFValue(14, 720) }}>Cân nặng mong muốn: <Text style={{ fontWeight: 'bold' }}>55kg</Text></Text>
					</View>
				</View>
			</Modal>
        </>
	)
}
const styles = StyleSheet.create({
	modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
		height: '100%'
    },
	modalContent: {
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
		padding: 20,
    }
})


export default Change;