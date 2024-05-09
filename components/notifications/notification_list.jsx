import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';

const NotificationsList = () => {
  // Dữ liệu ví dụ của các thông báo
  const notifications = [
    { id: 1, title: 'Chào mừng đến với HEALTH BUDDY', message: 'Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi. Chúc bạn một ngày tốt lành!', time: '09-05-2024, 6:25 PM', thumbnail: require('../../assets/img_bare_logo.png')},
    { id: 2, title: 'Nhắc nhở uống nước', message: 'Đừng quên uống nước và ghi chép nhật ký bạn nhé!', time: '09-05-2024, 6:25 PM', thumbnail: require('../../assets/img_water_glass.png')},
  ];

  return (
    <View style={{width: '100%', alignSelf: 'center', padding: 20}}>
        <FlatList
          scrollEnabled={false}
          data={notifications}
          renderItem={({ item }) => {
            return (
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <Image source={item.thumbnail}
                  style={styles.notiThumbnail}></Image>
                <View style={{flexShrink: 1}}>
                  <Text style={styles.notiHeader}>{item.title}</Text>
                  <Text style={styles.notiContent}>{item.message}</Text>
                  <Text style={styles.notiTime}>{item.time}</Text>
                </View>
              </View> 
            )}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notiHeader:{
    fontWeight: 'bold',
    fontSize: RFValue(15, 720),
    textAlignVertical: 'center',
    flexShrink: 1,
  },
  notiContent:{
    fontSize: RFValue(14, 720),
    textAlignVertical: 'center',
    textAlign: 'justify',
    lineHeight: 20
  },
  notiTime:{
    fontSize: RFValue(14, 720),
    color: colors.darkGray,
    textAlignVertical: 'center'
  }, 
  notiThumbnail:{
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginRight: 10
  }
})

export default NotificationsList;