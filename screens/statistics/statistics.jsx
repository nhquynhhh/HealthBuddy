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

  const END_LINEAR_COLOR = colors.blue;
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
      color: (opacity = 1) => `rgba(221, 20, 20, ${opacity})`,
    }],
  }

  const temp_water = {
    labels: numDate > 7 ? [] : dataLabel.map(item => item.substring(0, 5)),
    datasets: [{
      data: dataWater,
      color: (opacity = 1) => `rgba(0, 141, 218, ${opacity})`,
    }],
  }



  const Calories = () => {
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
        {
          <LineChart data={temp} width={390} height={220} yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(221, 20, 20, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16, },
              propsForDots: { r: '6', strokeWidth: '2', stroke: colors.red, fill: '#fff' },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16, }} />
        }
      </View>
    );
  };

  const Water = () => {
    const renderTitle = () => {
      return (
        <View style={{ marginVertical: 10 }}>
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
        {
          <LineChart data={temp_water} width={390} height={220} yAxisLabel={''}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 141, 218, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: { borderRadius: 16, },
              propsForDots: { r: '6', strokeWidth: '2', stroke: colors.blue, fill: '#fff' },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16, }} />
        }
      </View>
    );
  };


  return (
    <ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
      <View style={{ display: "flex", flexDirection: "row", gap: 5, justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 15 }}>
        <TouchableOpacity style={{
          backgroundColor: numDate === 7 ? END_LINEAR_COLOR : colors.gray,
          padding: 10, borderRadius: 50, width: '30%'
        }} onPress={() => setNumDate(7)}>
          <Text style={{ color: "white", fontWeight: "bold", alignSelf: 'center' }}>7 ngày</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: numDate === 14 ? END_LINEAR_COLOR : colors.gray,
          padding: 10, borderRadius: 50, width: '30%'
        }} onPress={() => setNumDate(14)}>
          <Text style={{ color: "white", fontWeight: "bold", alignSelf: 'center' }}>14 ngày</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: numDate === 30 ? END_LINEAR_COLOR : colors.gray,
          padding: 10, borderRadius: 50, width: '30%'
        }} onPress={() => setNumDate(30)}>
          <Text style={{ color: "white", fontWeight: "bold", alignSelf: 'center' }}>30 ngày</Text>
        </TouchableOpacity>

      </View>
      <View style={[currentPage === 'dailyStatistic' ? styles.displayPage : styles.hidePage]}>
        <View style={{ padding: 15 }}>
          <Calories></Calories>
        </View>
        <View>
          <Water style={{ alignSelf: 'center' }}></Water>
        </View>
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