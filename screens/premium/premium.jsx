import { View, Text, Image, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { Component, useState, useContext } from 'react'
import { Icon, Button, Divider, ListItem } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { colors } from '../../utils/colors'
import {handlePayMentURL} from '../../services/payment/call_payment'
import { useNavigation,useFocusEffect, useIsFocused } from '@react-navigation/native';
import Payment from '../webview/payment';
import { setPaymentURL } from '../../asyncStorage/auth';
import { AuthContext } from '../../context/AuthContext';
export default function Premium() {
	const windowHeight = useWindowDimensions().height;
	const windowWidth = useWindowDimensions().width;
	const navigation = useNavigation();
	const [url, setUrl] = useState('');
	const { paymentURL, setPaymentURL } = useContext(AuthContext);

	const upgradePack = [
		{ label: '550.000đ / năm', value: "yearly" },
		{ label: '50.000đ / tháng', value: "monthly" }
	]

	const [upgradePackSelected, setUpgradePackSelected] = useState('yearly');
	const [webViewUrl, setWebViewUrl] = useState(null);

	const handleRadioPress = (value) => {
		setUpgradePackSelected(value); // Cập nhật giá trị được chọn vào state
		console.log('Giá trị được chọn:', value); // In ra giá trị được chọn
	  };
	
	const handlePayment = async () => {
		const response = await handlePayMentURL(upgradePackSelected);
		console.log(response);
		if (response !== null) {
			navigation.navigate('Payment', { url: response });
		}
	}

	return (
		<View style={styles.container}>
			<View style={{ marginLeft: 30 }}>
				<View style={{ alignItems: 'center', position: 'relative' }}>
					<LinearGradient
						colors={[colors.blue, colors.lightBlue]}
						start={{ x: 0, y: 0.5 }}
						end={{ x: 1, y: 0.5 }}
						style={{ borderRadius: 15, padding: 10, width: windowWidth * 0.7, marginTop: 5 }}>
						<Text style={{ color: colors.white, textAlign: 'right', paddingRight: 10, fontSize: 16, lineHeight: 25 }}>
							Tiện ích không giới hạn{"\n"}với <Text style={{ fontWeight: 700 }}>tài khoản PREMIUM</Text>
						</Text>
					</LinearGradient>
				</View>
				<Image source={require('../../assets/img_premium.png')}
					style={{ width: 85, height: 85, position: 'absolute', top: 0, marginLeft: 10 }} />
			</View>
			<View style={{ alignItems: 'center', marginTop: 40 }}>
				<View style={{ flexDirection: 'row', width: windowWidth * 0.7, marginBottom: 15 }}>
					<Image source={require('../../assets/img_menu_unlock.png')} style={{ width: 35, height: 35 }}></Image>
					<Text style={{ fontSize: 15, textAlign: 'left', textAlignVertical: 'center', paddingLeft: 20 }}>Tính năng gợi ý thực đơn</Text>
				</View>
				<View style={{ flexDirection: 'row', width: windowWidth * 0.7, marginBottom: 15 }}>
					<Image source={require('../../assets/img_scan_unlock.png')} style={{ width: 35, height: 35 }}></Image>
					<Text style={{ fontSize: 15, textAlign: 'left', textAlignVertical: 'center', paddingLeft: 20 }}>Scan thực phẩm</Text>
				</View>
				<View style={{ flexDirection: 'row', width: windowWidth * 0.7, marginBottom: 15 }}>
					<Image source={require('../../assets/img_food_unlock.png')} style={{ width: 35, height: 35 }}></Image>
					<Text style={{ fontSize: 15, textAlign: 'left', textAlignVertical: 'center', paddingLeft: 20 }}>Mở khóa tất cả món ăn</Text>
				</View>
			</View>
			<Divider backgroundColor={colors.blue}
				style={{ width: windowWidth * 0.6, alignSelf: 'center', marginVertical: 20 }}>
			</Divider>
			<View style={{ marginLeft: 40 }}>
				<Text style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>Chọn gói nâng cấp</Text>
				<RadioForm
					radio_props={upgradePack}
					onPress={handleRadioPress}
					selectedLabelColor={colors.blue}
					buttonSize={8}
					buttonOuterSize={20}
					borderWidth={1}
					labelStyle={{ fontSize: 16 }}
					radioStyle={{ paddingVertical: 5 }}
				/>
			</View>
			<Button title={"TIẾP TỤC"}
				style={styles.btnClick}
				titleStyle={{ fontWeight: '700', fontSize: 20 }}
				buttonStyle={{ minWidth: windowWidth * 0.9, height: 45, borderRadius: 10 }}
				ViewComponent={LinearGradient}
				linearGradientProps={{
					colors: [colors.blue, colors.lightBlue],
					start: { x: 0, y: 0.5 },
					end: { x: 1, y: 0.5 },
				}}
				onPress={handlePayment}
			>
			</Button>
			<View style={{paddingBottom: 150}}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		paddingTop: 20
	},
	btnClick: {
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 20,
	},
})