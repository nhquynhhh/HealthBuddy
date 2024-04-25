import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import DatePicker, {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import { format } from 'date-fns';
import { LiquidGauge } from 'react-native-liquid-gauge';

export default function Calories() {
    const today = new Date();
    const defaultDate = format(today.setDate(today.getDate()), 'yyyy/MM/dd');
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectDate, setSelectDate] = useState(defaultDate);
    function handleCalendar(){
      setOpenCalendar(!openCalendar);
    }
    function handleSelectDate(selectDate){
      setSelectDate(selectDate);
    }
    const defaultWater = 0;
    const targetWater = 2000;
    
    const [waterValue, setWaterValue] = useState(defaultWater);
    const handleWaterValue = (valueClicked) => {
      const newConsumedWater = waterValue + valueClicked;
      setWaterValue(newConsumedWater);
    }
    const [newWaterValue, setNewWaterValue] = useState('');
    const handleNewWaterValue = (newWaterValue) => {
      setNewWaterValue(newWaterValue);
    };
    const updateConsumedWater = (newWaterValue) => {
      const newConsumedWater = waterValue + newWaterValue;
      setWaterValue(newConsumedWater);
    };
    const handleNewWaterValueSubmit = () => {
      const newWater = parseInt(newWaterValue);
      updateConsumedWater(newWater);
      setNewWaterValue('');
    };

    return (
      <ScrollView style={{backgroundColor: colors.white, marginBottom: 60}}>
        <View>
          <TouchableOpacity style={{flexDirection: 'row', paddingTop: 20, alignSelf: 'center'}} onPress={handleCalendar}>
            <Icon name='calendar-outline' type='ionicon' color={colors.blue}/>
            <Text style={{color: colors.blue, textAlignVertical: 'center', paddingHorizontal: 10, fontSize: RFValue(15,720), fontWeight: 'bold'}}>Chọn ngày</Text>
          </TouchableOpacity>
          <Text style={{alignSelf: 'center', paddingTop: 10, fontSize: RFValue(15, 720), fontWeight: 'bold'}}>{selectDate}</Text>
          <Modal
            animationType='slide'
            transparent={true}
            visible={openCalendar}
            onRequestClose={handleCalendar}>
              <View style={styles.centerCalendar}>
                <View style={styles.modalView}>
                  <DatePicker mode='calendar'
                    selected={selectDate}
                    onDateChange={handleSelectDate}
                    maximumDate={defaultDate}>
                  </DatePicker>
                  <TouchableOpacity onPress={handleCalendar}>
                    <Text style={{fontSize: RFValue(14, 720), marginBottom: 20, fontWeight: 'bold'}}>Chọn</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </Modal>
        </View>
        <Divider style={{marginVertical: 20, width: '50%', alignSelf: 'center'}}></Divider>
        <Text style={{fontSize: RFValue(16, 720), marginBottom: 20, textAlign: 'center'}}>Mục tiêu của bạn là: <Text style={{fontWeight: 'bold', color: colors.blue}}>{targetWater} ml</Text></Text>
        <View style={{alignSelf: 'center', marginTop: 10, marginBottom: 30}}>
          <LiquidGauge
            config={{
              circleColor: colors.blue,
              textColor: colors.blue,
              waveTextColor: colors.lightBlue,
              waveColor: colors.superLightBlue,
              circleThickness: 0.1,
              textVertPosition: 0.5,
              waveAnimateTime: 1000,
              maxValue: targetWater,
              textSuffix: '',
            }}
            value={waterValue}
            width={180}
            height={180}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.waterBtn} onPress={() => handleWaterValue(100)}>
              <Text style={styles.txtWaterBtn}>+ 100ml</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waterBtn} onPress={() => handleWaterValue(200)}>
              <Text style={styles.txtWaterBtn}>+ 200ml</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waterBtn} onPress={() => handleWaterValue(500)}>
              <Text style={styles.txtWaterBtn}>+ 500ml</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waterBtn} onPress={() => handleWaterValue(1000)}>
              <Text style={styles.txtWaterBtn}>+ 1000ml</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center', width: '100%', padding: 20}}>
            <View style={{width: '20%'}}>
              <Image source={require('../../assets/img_water_glass.png')} style={{width: 50, height: 50}}></Image>
            </View>
            <View style={{width: '80%', alignItems: 'center'}}>
              <TextInput placeholder='Nhập lượng nước (ml)'
                style={styles.inputMeal}
                keyboardType='numeric'
                onChangeText={handleNewWaterValue}
                onSubmitEditing={handleNewWaterValueSubmit}
                value={newWaterValue}></TextInput>
            </View>
          </View>
        </View>
        
        <View style={{marginBottom: 100}}></View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  centerCalendar:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView:{
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '90%',
    padding: 5,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputMeal:{
    borderWidth: 1, 
    borderRadius: 10, 
    width: '100%', 
    height: 40, 
    borderColor: colors.gray,
    marginTop: 10,
    padding: 10
  },
  waterBtn:{
    backgroundColor: colors.blue,
    padding: 10,
    width: 'auto',
    borderRadius: 5,
    marginHorizontal: 5
  },
  txtWaterBtn:{
    color: colors.white,
    fontSize: RFValue(16, 720),
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center'
  }

})