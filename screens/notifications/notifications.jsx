import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';

export default function Notifications() {
    const notifications = [
      { id: 1, title: 'Chào mừng đến với HEALTH BUDDY', message: 'Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi. Chúc bạn một ngày tốt lành!', time: '09-05-2024, 6:25 PM', thumbnail: require('../../assets/img_bare_logo.png')},
      { id: 2, title: 'Nhắc nhở uống nước', message: 'Đừng quên uống nước và ghi chép nhật ký bạn nhé!', time: '09-05-2024, 6:25 PM', thumbnail: require('../../assets/img_water_glass.png')},
      { id: 3, title: 'Nhắc nhở ăn uống', message: 'Đừng quên ghi chép nhật ký ăn uống của bạn nhé!', time: '09-05-2024, 6:25 PM', thumbnail: require('../../assets/img_suggest_icon.png')},
    ];
    const sortNotificationsByIdDescending = (notifications) => {
      return [...notifications].sort((a, b) => b.id - a.id);
    };
    const sortedNotifications = sortNotificationsByIdDescending(notifications);
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{width: '100%', alignSelf: 'center', padding: 20}}>
          <FlatList
            scrollEnabled={false}
            data={sortedNotifications}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={{flexDirection: 'row', marginVertical: 12}}>
                    <Image source={item.thumbnail}
                      style={styles.notiThumbnail}></Image>
                    <View style={{flexShrink: 1}}>
                      <Text style={styles.notiHeader}>{item.title}</Text>
                      <Text style={styles.notiContent}>{item.message}</Text>
                      <Text style={styles.notiTime}>{item.time}</Text>
                    </View>
                  </View>
                    <View style={{flex: 1, height: 0.8, backgroundColor: colors.gray}} />
                </View> 
              )}}
        />
      </View>
      </ScrollView>
    )
}

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
    lineHeight: 25
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
    marginRight: 20
  }
})