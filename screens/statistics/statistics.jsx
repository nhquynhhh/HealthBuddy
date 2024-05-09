import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import DatePicker, {getToday, getFormatedDate} from 'react-native-modern-datepicker';
import { BarChart, LineChart } from 'react-native-gifted-charts';

export default function Statistics() {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

  const [currentPage, setCurrentPage] = useState('dailyStatistic');
  const [currentPageTab, setCurrentPageTab] = useState('dailyStatisticTab');

  const today = new Date();
  const defaultDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD');
  const defaultMonth = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM');
  const defaultYear = getFormatedDate(today.setDate(today.getDate()), 'YYYY');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectDate = defaultDate, setSelectDate] = useState(selectDate);
  const [selectMonth = defaultMonth, setSelectMonth] = useState(selectMonth);
  const [selectYear = defaultYear, setSelectYear] = useState(selectYear);

  function handleCalendar(){
    setOpenCalendar(!openCalendar);
  }

  function handleSelectDate(selectDate){
    setSelectDate(selectDate);
  }
  function handleSelectMonth(selectMonth){
    setSelectMonth(selectMonth);
  }
  function handleSelectYear(selectYear){
    setSelectYear(selectYear);
  }

  const Calories = () => {
    const barData = [
        {
          value: 40,
          label: 'Jan',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 20, frontColor: colors.blue},
        {
          value: 50,
          label: 'Feb',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 40, frontColor: colors.blue},
        {
          value: 75,
          label: 'Mar',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 25, frontColor: colors.blue},
        {
          value: 30,
          label: 'Apr',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 20, frontColor: colors.blue},
        {
          value: 60,
          label: 'May',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 40, frontColor: colors.blue},
        {
          value: 65,
          label: 'Jun',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 30, frontColor: colors.blue},
        {
          value: 60,
          label: 'May',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: colors.darkGray,
          frontColor: colors.red,
        },
        {value: 40, frontColor: colors.blue},
      ];

      const renderTitle = () => {
          return(
            <View style={{marginVertical: 20}}>
            <Text
              style={{
                color: colors.red,
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Thống kê lượng calories
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 24,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: colors.red,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    width: 'auto',
                    height: 20,
                    color: colors.black,
                    textAlignVertical: 'center'
                  }}>
                  Calories hấp thu
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: colors.blue,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    width: 'auto',
                    height: 20,
                    color: colors.black,
                    textAlignVertical: 'center'
                  }}>
                  Calories tiêu hao
                </Text>
              </View>
            </View>
          </View>
          )
      }

    return (
        <View
        style={{
          paddingBottom: 40,
          marginTop: 20,
          borderRadius: 10,
        }}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={8}
          spacing={18}
          roundedTop
          roundedBottom
          rulesType='dash'
          rulesColor={colors.darkGray}
          xAxisThickness={1}
          xAxisColor={colors.darkGray}
          yAxisThickness={1}
          yAxisColor={colors.darkGray}
          yAxisTextStyle={colors.darkGray}
          noOfSections={4}
          maxValue={75}
        />
      </View>
    );
  };

  const Water = () => {
    const data1 = [
      {value: 70},
      {value: 36},
      {value: 50},
      {value: 40},
      {value: 18},
      {value: 38},
      {value: 38},
    ];
    const renderTitle = () => {
      return (
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: colors.blue,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Thống kê lượng nước uống
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          padding: 20,
          borderRadius: 10,
        }}>
        {renderTitle()}
        <LineChart
          areaChart
          curved
          data={data1}
          dataPointsColor1={colors.blue}
          spacing={45}
          color1={colors.blue}
          startFillColor1={colors.blue}
          endFillColor1={colors.blue}
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={0}
          noOfSections={4}
          yAxisColor="white"
          yAxisThickness={0}
          rulesType='dash'
          rulesColor={colors.darkGray}
          yAxisTextStyle={{color: 'gray'}}
          yAxisLabelSuffix="%"
          xAxisColor="lightgray"
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: 'lightgray',
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 120,
                    width: 100,
                    backgroundColor: '#282C3E',
                    borderRadius: 4,
                    justifyContent:'center',
                    paddingLeft:16,
                  }}>
                  <Text style={{color: 'lightgray',fontSize:12}}>{2018}</Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{items[0].value}</Text>
                </View>
              );
            },
          }}
        />
      </View>
    );
  };


  return (
    <ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: windowWidth * 0.85, alignSelf: 'center', marginTop: 20 }}>
        <TouchableOpacity style={[styles.activePage, currentPageTab === 'dailyStatisticTab' ? styles.activePage : styles.inactivePage]}
          name='dailyStatisticTab'
          onPress={() => {
            setCurrentPage('dailyStatistic');
            setCurrentPageTab('dailyStatisticTab');
          }}>
          <Text style={[styles.activeText, currentPageTab === 'dailyStatisticTab' ? styles.activeText : styles.inactiveText]}>Ngày</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.inactivePage, currentPageTab === 'monthlyStatisticTab' ? styles.activePage : styles.inactivePage]} name='monthlyStatisticTab'
          onPress={() => {
            setCurrentPage('monthlyStatistic');
            setCurrentPageTab('monthlyStatisticTab');
          }}>
          <Text style={[styles.inactiveText, currentPageTab === 'monthlyStatisticTab' ? styles.activeText : styles.inactiveText]}>Tháng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.inactivePage, currentPageTab === 'yearlyStatisticTab' ? styles.activePage : styles.inactivePage]} name='yearlyStatisticTab'
          onPress={() => {
            setCurrentPage('yearlyStatistic');
            setCurrentPageTab('yearlyStatisticTab');
          }}>
          <Text style={[styles.inactiveText, currentPageTab === 'yearlyStatisticTab' ? styles.activeText : styles.inactiveText]}>Năm</Text>
        </TouchableOpacity>
      </View>
      <View style={[currentPage === 'dailyStatistic' ? styles.displayPage : styles.hidePage]}>
        <TouchableOpacity style={{flexDirection: 'row', paddingTop: 20, alignSelf: 'center'}} onPress={handleCalendar}>
          <Icon name='calendar-outline' type='ionicon' color={colors.blue}/>
          <Text style={{color: colors.blue, textAlignVertical: 'center', paddingHorizontal: 10, fontSize: RFValue(15,720), fontWeight: 'bold'}}>Chọn ngày</Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontSize: RFValue(15, 720), fontWeight: 'bold'}}>{selectDate}</Text>
        <Modal
          animationType='slide'
          transparent={true}
          visible={openCalendar}>
            <View style={styles.centerCalendar}>
              <View style={styles.modalView}>
                <DatePicker mode='calendar'
                  selected={selectDate}
                  onDateChange={handleSelectDate}
                  maximumDate={defaultDate}>
                </DatePicker>
                <TouchableOpacity onPress={handleCalendar}>
                  <Text style={{fontSize: RFValue(14, 720)}}>Chọn</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
        <View style={{padding: 15}}>
          <Calories></Calories>
        </View>
        <View>
          <Water style={{alignSelf: 'center'}}></Water>
        </View>
      </View>
      <View style={[currentPage === 'monthlyStatistic' ? styles.displayPage : styles.hidePage]}>
      <TouchableOpacity style={{flexDirection: 'row', paddingTop: 20, alignSelf: 'center'}} onPress={handleCalendar}>
          <Icon name='calendar-outline' type='ionicon' color={colors.blue}/>
          <Text style={{color: colors.blue, textAlignVertical: 'center', paddingHorizontal: 10, fontSize: RFValue(15,720), fontWeight: 'bold'}}>Chọn tháng</Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center', paddingTop: 10, fontSize: RFValue(15, 720), fontWeight: 'bold'}}>{selectMonth}</Text>
        <Modal
          animationType='slide'
          transparent={true}
          visible={openCalendar}>
            <View style={styles.centerCalendar}>
              <View style={styles.modalView}>
                <DatePicker mode='monthYear'
                  selected={selectMonth}
                  onDateChange={handleSelectMonth}
                  maximumDate={defaultMonth}>
                </DatePicker>
                <TouchableOpacity onPress={handleCalendar}>
                  <Text style={{fontSize: RFValue(14, 720)}}>Chọn</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View>
      <View style={[currentPage === 'yearlyStatistic' ? styles.displayPage : styles.hidePage]}>

      </View>
      <View style={{paddingBottom: 60}}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  activePage: {
    backgroundColor: colors.blue,
    padding: 5,
    width: 90,
    borderRadius: 20
  },
  activeText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(15, 720)
  },
  inactivePage: {
    backgroundColor: colors.gray,
    padding: 5,
    width: 90,
    borderRadius: 20
  },
  inactiveText: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(15, 720)
  },
  hidePage: {
    display: 'none',
  },
  displayPage: {
    display: 'flex',
  },
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
  txtTitle:{
    fontSize: RFValue(15, 720),
    textAlignVertical: 'center'
  }
})