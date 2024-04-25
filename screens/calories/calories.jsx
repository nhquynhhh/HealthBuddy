import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import DatePicker, {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import CircularProgress from 'react-native-circular-progress-indicator';
import { format } from 'date-fns';

export default function Calories() {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

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
  // Chưa tối ưu, chỉnh sau nha
  const defaultCalories = 0;
  const targetCalories = 2000;
  const [caloValueBreakfast, setCaloValueBreakfast] = useState('');
  const [caloValueLunch, setCaloValueLunch] = useState('');
  const [caloValueDinner, setCaloValueDinner] = useState('');
  const [caloValueSnacks, setCaloValueSnacks] = useState('');
  const [caloValueWorkout, setCaloValueWorkout] = useState('');
  const [consumedCalories, setConsumedCalories] = useState(defaultCalories);
  const handleCaloBreakfastChange = (caloValueBreakfast) => {
    setCaloValueBreakfast(caloValueBreakfast);
  };
  const handleCaloLunchChange = (caloValueLunch) => {
    setCaloValueLunch(caloValueLunch);
  };
  const handleCaloDinnerChange = (caloValueDinner) => {
    setCaloValueDinner(caloValueDinner);
  };
  const handleCaloSnacksChange = (caloValueSnacks) => {
    setCaloValueSnacks(caloValueSnacks);
  };
  const handleCaloWorkoutChange = (caloValueWorkout) => {
    setCaloValueWorkout(caloValueWorkout);
  };
  const handleCaloBreakfastSubmit = () => {
    const calories = parseInt(caloValueBreakfast);
    updateConsumedCalories(calories);
    setCaloValueBreakfast('');
  };
  const handleCaloLunchSubmit = () => {
    const calories = parseInt(caloValueLunch);
    updateConsumedCalories(calories);
    setCaloValueLunch('');
  };
  const handleCaloDinnerSubmit = () => {
    const calories = parseInt(caloValueDinner);
    updateConsumedCalories(calories);
    setCaloValueDinner('');
  };
  const handleCaloSnacksSubmit = () => {
    const calories = parseInt(caloValueSnacks);
    updateConsumedCalories(calories);
    setCaloValueSnacks('');
  };
  const handleCaloWorkoutSubmit = () => {
    const calories = parseInt(caloValueWorkout);
    updateWorkoutCalories(calories);
    setCaloValueWorkout('');
  };
  const updateConsumedCalories = (calories) => {
    const newConsumedCalories = consumedCalories + calories;
    setConsumedCalories(newConsumedCalories);
  };
  const updateWorkoutCalories = (calories) => {
    const newConsumedCalories = consumedCalories - calories;
    setConsumedCalories(newConsumedCalories);
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
      <View style={{alignSelf: 'center', marginTop: 40, marginBottom: 30}}>
        <CircularProgress
            value={consumedCalories}
            inActiveStrokeColor={colors.gray}
            inActiveStrokeOpacity={0.4}
            activeStrokeColor={colors.red}
            progressValueColor={colors.red}
            radius={100}
            maxValue={targetCalories}
            progressValueFontSize={RFValue(35, 720)}
            subtitle={" / " + targetCalories + " calo"}
            subtitleStyle={{fontSize: RFValue(16, 720), textAlign: 'center'}}
        />
      </View>
      <View style={styles.mealBox}>
          <Image source={require('../../assets/img_breakfast_icon.png')} style={{width: 60, height: 60, marginRight: 10, alignSelf: 'center'}}/>
          <View style={{width: windowWidth * 0.65}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Text style={styles.txtMeal}>Bữa sáng</Text>
              <Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
            </View>
            <TextInput style={styles.inputMeal}
              placeholder='Nhập lượng calories'
              keyboardType='numeric'
              onChangeText={handleCaloBreakfastChange}
              onSubmitEditing={handleCaloBreakfastSubmit}
              value={caloValueBreakfast}/>
          </View>
      </View>
      <View style={styles.mealBox}>
          <Image source={require('../../assets/img_lunch_icon.png')} style={{width: 60, height: 60, marginRight: 10, alignSelf: 'center'}}/>
          <View style={{width: windowWidth * 0.65}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Text style={styles.txtMeal}>Bữa trưa</Text>
              <Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
            </View>
            <TextInput style={styles.inputMeal}
              placeholder='Nhập lượng calories'
              keyboardType='numeric'
              onChangeText={handleCaloLunchChange}
              onSubmitEditing={handleCaloLunchSubmit}
              value={caloValueLunch}/>
          </View>
      </View>
      <View style={styles.mealBox}>
          <Image source={require('../../assets/img_dinner_icon.png')} style={{width: 60, height: 60, marginRight: 10, alignSelf: 'center'}}/>
          <View style={{width: windowWidth * 0.65}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Text style={styles.txtMeal}>Bữa tối</Text>
              <Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
            </View>
            <TextInput style={styles.inputMeal}
              placeholder='Nhập lượng calories'
              keyboardType='numeric'
              onChangeText={handleCaloDinnerChange}
              onSubmitEditing={handleCaloDinnerSubmit}
              value={caloValueDinner}/>
          </View>
      </View>
      <View style={styles.mealBox}>
          <Image source={require('../../assets/img_snacks_icon.png')} style={{width: 60, height: 60, marginRight: 10, alignSelf: 'center'}}/>
          <View style={{width: windowWidth * 0.65}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Text style={styles.txtMeal}>Ăn vặt</Text>
              <Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
            </View>
            <TextInput style={styles.inputMeal}
              placeholder='Nhập lượng calories'
              keyboardType='numeric'
              onChangeText={handleCaloSnacksChange}
              onSubmitEditing={handleCaloSnacksSubmit}
              value={caloValueSnacks}/>
          </View>
      </View>
      <View style={styles.mealBox}>
          <Image source={require('../../assets/img_workout_calo_icon.png')} style={{width: 60, height: 60, marginRight: 10, alignSelf: 'center'}}/>
          <View style={{width: windowWidth * 0.65}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Text style={styles.txtMeal}>Vận động</Text>
              <Text style={styles.txtMealDescription}>Khuyến nghị 100 calo</Text>
            </View>
            <TextInput style={styles.inputMeal}
              placeholder='Nhập lượng calories'
              keyboardType='numeric'
              onChangeText={handleCaloWorkoutChange}
              onSubmitEditing={handleCaloWorkoutSubmit}
              value={caloValueWorkout}/>
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
txtMeal:{
  fontSize: RFValue(15, 720),
  fontWeight: 'bold',
  textAlignVertical: 'center',
},
txtMealDescription:{
  fontSize: RFValue(12, 720),
  color: colors.darkGray,
  textAlignVertical: 'center',
  fontStyle: 'italic',
},
mealBox:{
  flexDirection: 'row', 
  width: '90%', 
  alignSelf: 'center', 
  padding: 10, 
  borderWidth: 1, 
  borderColor: colors.gray, 
  borderRadius: 20,
  marginVertical: 10
},
inputMeal:{
  borderWidth: 1, 
  borderRadius: 10, 
  width: '100%', 
  height: 40, 
  borderColor: colors.gray,
  marginTop: 10,
  padding: 10
}

})