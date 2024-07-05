import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SearchBar, Icon, Divider, Input, Button } from 'react-native-elements';
import { CameraView, useCameraPermissions, Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
// import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { FeatureHeaderComponent } from "../FeatureHeaderComponent";
import * as MediaLibrary from 'expo-media-library';
import { colors } from "../../utils/colors";
import { useNavigation } from '@react-navigation/native';

export default function Scan() {
	// const dispatch = useDispatch()
	const cameraRef = useRef(null);
	const navigation = useNavigation();
	const [facing, setFacing] = useState('back');
	const [permission, requestPermission] = useCameraPermissions();
	const [image, setImage] = useState(null);
	const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
	const [photoTaken, setPhotoTaken] = useState(false);

	if (!permission || !permissionMedia) {
		// Camera permissions are still loading.
		return <View style={{ backgroundColor: colors.white }} />;
	}

	if (!permission.granted || !permissionMedia.granted) {
		return (
			<View style={{ alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
				<Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>Vui lòng cấp quyền truy cập camera và thư viện.</Text>
				<Button onPress={() => {
					requestPermission();
					requestPermissionMedia();
				}} title="CẤP QUYỀN MÁY ẢNH VÀ THƯ VIỆN" />
			</View>
		);
	}

	const toggleCameraFacing = () => {
		setFacing(current => (current === 'back' ? 'front' : 'back'));
	}

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				aspect: [4, 3],
				quality: 1,
			});
			console.log(result);

			if (!result.canceled) {
				setImage(result.assets[0].uri);
				navigation.navigate('PreviewScreen', { imageUri: result.assets[0].uri });
			}
		}
		catch (error) {
			console.error('Error picking image:', error);
		}
	}

	const takePicture = async () => {
		if (cameraRef.current) {
			try {
				const { uri } = await cameraRef.current.takePictureAsync();
				console.log(uri);
				navigation.navigate('PreviewScreen', { imageUri: uri });
			} catch (error) {
				console.error('Error taking picture:', error);
			}
		}
	}

	const saveImage = async (image) => {
		if (image) {
			try {
				await MediaLibrary.saveToLibraryAsync(image);
			} catch (error) {
				console.error('Error saving image:', error);
			}
		}
	}

	return (
		<View style={{}}>
			<FeatureHeaderComponent title="Chụp ảnh món ăn" />
			<CameraView style={{ width: "100%", height: 500 }} facing={facing} ref={cameraRef}>
			</CameraView>

			<View style={{
				display: "flex", flexDirection: "row", justifyContent: "space-between",
				marginTop: 30, alignItems: "center", marginHorizontal: 20, marginBottom: 100,
			}}>
				<TouchableOpacity onPress={pickImage}>
					<Ionicons name="image" size={35} color="black" />
				</TouchableOpacity>
				<TouchableOpacity onPress={takePicture}>
					<Image style={{ width: 60, height: 60 }} source={require('../../assets/camera1.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={toggleCameraFacing}>
					<Ionicons name="camera-reverse" size={35} color="black" />
				</TouchableOpacity>
			</View>
		</View  >
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	camera: {
		flex: 1,
	}
});