import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';
import { handleDetect } from '../../services/detect/handle_detect';

export default function PreviewScreen({ route, navigation }) {
	const { imageUri } = route.params;

	const handleDetectObject = async () => {
		console.log('Detecting object...');
		const object = await handleDetect({ uri: imageUri });
		console.log(object);
		navigation.navigate("Results", { detectedObject: object});
	}

	const retakePicture = () => {
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<Image source={{ uri: imageUri }} style={styles.previewImage} />

			<View style={styles.previewControls}>
				<Button title="Chọn lại" onPress={retakePicture} />
				<Button title="Chọn ảnh này" onPress={()=>{handleDetectObject()}} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	previewImage: {
		width: '100%',
		height: '80%',
		resizeMode: 'contain',
	},
	previewControls: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 100,
		width: '100%',
	},
});
