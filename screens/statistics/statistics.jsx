import { Modal, ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component, useState, useEffect, useRef } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
// import { BarChart, LineChart } from 'react-native-gifted-charts';
import { handleGetStatic } from '../../services/statistic/get_statistic';
import { handleGetStaticWater } from '../../services/water/get_statistic_water';
import { LineChart } from 'react-native-chart-kit';


export default function Statistics() {
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;

  const [currentPage, setCurrentPage] = useState('dailyStatistic');
  const [currentPageTab, setCurrentPageTab] = useState('dailyStatisticTab');

  const END_LINEAR_COLOR = '#FF7E06';
  const [numDate, setNumDate] = useState(7);
  const [dataLabel, setDataLabel] = useState([""])
  const [dataCalo, setDataCalo] = useState([0])
  const [tdee, setTDEE] = useState(0);
  const [dataWater, setDataWater] = useState([0])

  const today = new Date();
  const defaultDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD');
  const defaultMonth = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM');
  const defaultYear = getFormatedDate(today.setDate(today.getDate()), 'YYYY');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectDate = defaultDate, setSelectDate] = useState(selectDate);
  const [selectMonth = defaultMonth, setSelectMonth] = useState(selectMonth);
  const [selectYear = defaultYear, setSelectYear] = useState(selectYear);

  function handleCalendar() {
    setOpenCalendar(!openCalendar);
  }

  function handleSelectDate(selectDate) {
    setSelectDate(selectDate);
  }
  function handleSelectMonth(selectMonth) {
    setSelectMonth(selectMonth);
  }
  function handleSelectYear(selectYear) {
    setSelectYear(selectYear);
  }

  const handleGetUserData = async () => {
    const res = await handleGetStatic(numDate)
    if (res !== 0) {
      const dateValues = res.data.map(item => item.date);
      const caloValues = res.data.map(item => item.total_calo);
      setDataLabel(dateValues)
      setDataCalo(caloValues)
      setTDEE(res.tdee)
    }
    else {
      console.log('Error fetching data');
    }
  }

    const handleGetUserWater = async () => {
    const res = await handleGetStaticWater(numDate)
    if (res !== 0) {
      const dateValues = res.data.map(item => item.date);
      const waterValues = res.data.map(item => item.total_water);
      setDataWater(waterValues)
    }
    else {
      console.log('Error fetching data');
    }
  }

  const fetchData = async () => {
    await handleGetUserData();
    await handleGetUserWater();
  }

  useEffect(() => {
    fetchData()
  }, [numDate])


  useEffect(() => {
    fetchData()
  }, [])

  const temp = {
    labels: numDate > 7 ? [] : dataLabel.map(item => item.substring(0, 5)),
    datasets: [{
      data: dataCalo,
      color: (opacity = 1) => `rgba(26, 140, 3, ${opacity})`,
    }],
  }

  const temp_water = {
    labels: numDate > 7 ? [] : dataLabel.map(item => item.substring(0, 5)),
    datasets: [{
      data: dataWater,
      color: (opacity = 1) => `rgba(26, 140, 3, ${opacity})`,
    }],
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
      { value: 20, frontColor: colors.blue },
      {
        value: 50,
        label: 'Feb',
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: colors.darkGray,
        frontColor: colors.red,
      },
      { value: 40, frontColor: colors.blue },
      {
        value: 75,
        label: 'Mar',
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: colors.darkGray,
        frontColor: colors.red,
      },
      { value: 25, frontColor: colors.blue },
      {
        value: 30,
        label: 'Apr',
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: colors.darkGray,
        frontColor: colors.red,
      },
      { value: 20, frontColor: colors.blue },
      {
        value: 60,
        label: 'May',
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: colors.darkGray,
        frontColor: colors.red,
      },
      { value: 40, frontColor: colors.blue },
      {
        value: 65,
        label: 'Jun',
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: colors.darkGray,
        frontColor: colors.red,
      },
      { value: 30, frontColor: colors.blue },
      {
        value: 60,
        label: 'May',
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: colors.darkGray,
        frontColor: colors.red,
      },
      { value: 40, frontColor: colors.blue },
    ];

    const renderTitle = () => {
      return (
        <View style={{ marginVertical: 20 }}>
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
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            </View> */}
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            </View> */}
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
        {/* <BarChart
          data={temp}
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
        /> */}
        {
          <LineChart data={temp} width={390} height={220} yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 140, 3, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16, },
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#1A8C03', fill: '#fff' },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16, }} />
        }
      </View>
    );
  };

  const Water = () => {
    const data1 = [
      { value: 70 },
      { value: 36 },
      { value: 50 },
      { value: 40 },
      { value: 18 },
      { value: 38 },
      { value: 38 },
    ];
    const renderTitle = () => {
      return (
        <View style={{ marginVertical: 20 }}>
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
        {/* <LineChart
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
          yAxisTextStyle={{ color: 'gray' }}
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
                    justifyContent: 'center',
                    paddingLeft: 16,
                  }}>
                  <Text style={{ color: 'lightgray', fontSize: 12 }}>{2018}</Text>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>{items[0].value}</Text>
                </View>
              );
            },
          }}
        /> */}
        {
          <LineChart data={temp_water} width={390} height={220} yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(26, 140, 3, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16, },
              propsForDots: { r: '6', strokeWidth: '2', stroke: '#1A8C03', fill: '#fff' },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16, }} />
        }
      </View>
    );
  };


  return (
    <ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <TouchableOpacity style={{
          backgroundColor: numDate === 7 ? END_LINEAR_COLOR : '#D9D9D9',
          padding: 10, borderRadius: 50
        }} onPress={() => setNumDate(7)}>
          <Text style={{ color: "white", fontWeight: "bold" }}>07</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: numDate === 14 ? END_LINEAR_COLOR : '#D9D9D9',
          padding: 10, borderRadius: 50
        }} onPress={() => setNumDate(14)}>
          <Text style={{ color: "white", fontWeight: "bold" }}>14</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: numDate === 30 ? END_LINEAR_COLOR : '#D9D9D9',
          padding: 10, borderRadius: 50
        }} onPress={() => setNumDate(30)}>
          <Text style={{ color: "white", fontWeight: "bold" }}>30</Text>
        </TouchableOpacity>

      </View>
      <View style={[currentPage === 'dailyStatistic' ? styles.displayPage : styles.hidePage]}>
        {/* <TouchableOpacity style={{flexDirection: 'row', paddingTop: 20, alignSelf: 'center'}} onPress={handleCalendar}>
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
        </Modal> */}
        <View style={{ padding: 15 }}>
          <Calories></Calories>
        </View>
        <View>
          <Water style={{ alignSelf: 'center' }}></Water>
        </View>
      </View>
      <View style={[currentPage === 'monthlyStatistic' ? styles.displayPage : styles.hidePage]}>
        {/* <TouchableOpacity style={{flexDirection: 'row', paddingTop: 20, alignSelf: 'center'}} onPress={handleCalendar}>
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
        </Modal> */}
      </View>
      <View style={[currentPage === 'yearlyStatistic' ? styles.displayPage : styles.hidePage]}>

      </View>
      <View style={{ paddingBottom: 60 }}></View>
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
  centerCalendar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
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
  txtTitle: {
    fontSize: RFValue(15, 720),
    textAlignVertical: 'center'
  }
})