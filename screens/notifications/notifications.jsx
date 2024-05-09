import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import NotificationsList from '../../components/notifications/notification_list';

export default function Notifications() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <NotificationsList></NotificationsList>
      </ScrollView>
    )
}