import React, { useEffect, useState, useRef } from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image, Alert} from 'react-native';
import { Camera } from 'expo-camera';
import { SearchBar, Icon, Divider, Input, Button } from 'react-native-elements';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { FeatureHeaderComponent } from "../FeatureHeaderComponent";
import { colors } from "../../utils/colors";

export default function Scan() {
    // const dispatch = useDispatch()
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View style={{backgroundColor: colors.white}}/>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{alignSelf: 'center', marginTop: 'auto', marginBottom: 'auto'}}>
        <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>We need your permission to use the camera.</Text>
        <Button onPress={requestPermission} title="CẤP QUYỀN MÁY ẢNH" />
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
          allowsEditing: true,
          aspect: [4, 6],
          quality: 1,
          });
          if (!result.canceled) {
              const uri = result.assets[0].uri
              setImage(uri)
              // navigation.push('ResultDetection', {uri})
          } else {
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
        setImage(uri);
        // navigation.push('ResultDetection', {uri})
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }
    return (
        <View style={{}}>
          <FeatureHeaderComponent title="Chụp ảnh món ăn"/>
          <CameraView style={{ width: "100%", height: 500 }} facing={facing}  ref={cameraRef}> 
          </CameraView>

          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", 
              marginTop: 30, alignItems: "center", marginHorizontal: 20, marginBottom: 100,}}>
                  <TouchableOpacity  onPress={pickImage}>
                      <Ionicons name="image" size={35} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={takePicture}>
                      <Image style={{width: 60, height: 60}} source={require('../../assets/camera1.png')} />
                      </TouchableOpacity>
                  <TouchableOpacity  onPress={toggleCameraFacing}>
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