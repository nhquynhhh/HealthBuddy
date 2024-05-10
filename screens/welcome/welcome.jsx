import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';

export default function Welcome() {
    return(
        <View style={{backgroundColor: colors.white, alignItems: 'center', height: '100%', width: '100%', paddingVertical: 120}}>
            <View>
                <Image source={require('../../assets/img_welcome.jpg')}
                    style={{width: 280, height: 200, alignSelf: 'center'}}></Image>
                <Text style={{textAlign:'center', fontSize: RFValue(16, 720), fontWeight: 'bold', marginTop: 20}}>Chào mừng bạn đến với</Text>
                <Image source={require('../../assets/img_long_logo.png')}
                    style={{width: 230, height: 42, alignSelf: 'center'}}></Image>
            </View>
            <View style={{marginTop: 120}}>
                <Text style={{fontStyle: 'italic', color: colors.darkGray}}>Cửa sổ sẽ tự động đóng sau 3 giây...</Text>
            </View>
        </View>
    )
}