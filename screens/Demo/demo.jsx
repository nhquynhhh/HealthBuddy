import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const API_URL = 'https://premium-singularly-meerkat.ngrok-free.app/api/calculate';

const SimpleScreen = () => {
	const [number1, setNumber1] = useState('');
	const [number2, setNumber2] = useState('');
	const [result, setResult] = useState('');
	const [apiInfo, setApiInfo] = useState('');
	const handleSendRequest = () => {
		// Kiểm tra xem các số có hợp lệ không
		if (!number1 || !number2) {
			Alert.alert('Thông báo', 'Vui lòng nhập cả hai số.');
			return;
		}
		const info = {
			api: API_URL,
			methods: 'POST',
			body: {
				a: (number1),
				b: (number2),
			},
		}
		setResult('')
		setApiInfo(info)
		// Gửi yêu cầu đến API
		fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				a: parseFloat(number1),
				b: parseFloat(number2),
			}),
		})
			.then(response => response.json())
			.then(data => {
				setResult(data.result)
				setApiInfo(prevApiInfo => ({ ...prevApiInfo, result: data.result }));
				// setApiInfo(`API: ${data.api}, Data: ${data.data}`);
			})
			.catch(error => {
				console.error('Lỗi khi gửi yêu cầu:', error);
			});
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				placeholder="Nhập số thứ nhất"
				value={number1}
				onChangeText={text => setNumber1(text)}
			/>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				placeholder="Nhập số thứ hai"
				value={number2}
				onChangeText={text => setNumber2(text)}
			/>
			{apiInfo && (
				<View style={styles.apiInfoContainer}>
					<Text style={styles.apiInfo}>API: {apiInfo.api}</Text>
					<Text style={styles.apiInfo}>Method: {apiInfo.methods}</Text>
					<Text style={styles.apiInfo}>Body:</Text>
					<Text style={styles.apiInfo}>{JSON.stringify(apiInfo.body, null, 2)}</Text>
					{apiInfo.result && <Text style={styles.apiInfo}>Result: {apiInfo.result}</Text>}
				</View>
			)}
			{result !== '' && <Text style={styles.result}>Kết quả: {result}</Text>}

			<Button title="Gửi yêu cầu" onPress={handleSendRequest} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	input: {
		width: '100%',
		marginBottom: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
	},
	apiInfo: {
		marginTop: 10,
		fontSize: 14,
		color: 'blue',
	},
	apiInfoContainer: {
		marginTop: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		width: '100%',
		marginBottom: 10
	},
	apiInfo: {
		fontSize: 14,
		marginBottom: 5,
	},
	result: {
		fontSize: 18,
		marginBottom: 10,
	},
});

export default SimpleScreen;
