// LoadingModal.js
import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingModal = ({ visible }) => {
	return (
		<Modal
			transparent={true}
			animationType="none"
			visible={visible}
			onRequestClose={() => { console.log("Modal has been closed.") }}>
			<View style={styles.modalBackground}>
				<View style={styles.activityIndicatorWrapper}>
					<ActivityIndicator
						animating={visible} size="large" color="#0000ff" />
					<Text style={styles.loadingText}>Đang đăng nhập</Text>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	activityIndicatorWrapper: {
		backgroundColor: '#FFFFFF',
		padding: 20,
		borderRadius: 15,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 250,  // Set the width for rectangular shape
		height: 150,  // Set the height for rectangular shape
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	loadingText: {
		marginTop: 20,
		color: '#0000ff',
		fontSize: 18,
		fontWeight: 'bold',
	},
});

export default LoadingModal;
