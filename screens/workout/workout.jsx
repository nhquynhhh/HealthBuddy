import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { workout } from '../../component/exercise_list';
import { colors } from '../../utils/colors';

const Workout = () => {
    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
    const navigation = useNavigation();

    return (
      <ScrollView style={{backgroundColor: colors.white, marginBottom: 60}}>
        <View style={{marginVertical: 20}}>
          <Image source={require('../../assets/img_exercises.png')} style={{width: 300, height: 180, alignSelf: 'center'}} />
        </View>
        <View>
          <Text style={{paddingTop: 20, fontWeight: 'bold', fontSize: RFValue(17,720), color: colors.blue, textAlign: 'center'}}>Các bài tập dành cho bạn</Text>
        </View>
        {workout.map((workout) => (
        <TouchableOpacity
          key={workout.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 2,
            borderColor: colors.gray,
            borderWidth: 1,
            width: windowWidth * 0.9,
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: 20
          }}
          onPress={() => { navigation.navigate(workout.screen) }}>
          <View style={{ padding: 5 }}>
            <Image
              source={{ uri: workout.image }}
              style={{ width: 100, height: 150, alignSelf: 'center' }}
            />
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2 }}>{workout.title}</Text>
            <Text style={{ color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720) }}>
              <Text style={{ fontWeight: 'bold' }}>Dụng cụ:</Text> {workout.equipment}
            </Text>
            <Text style={{ color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720) }}>
              <Text style={{ fontWeight: 'bold' }}>Calories tiêu hao:</Text> {workout.calo}
            </Text>
            <Text style={{ color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720) }}>
              <Text style={{ fontWeight: 'bold' }}>Tác động:</Text> {workout.impact}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
        {/* <FlatList
					scrollEnabled={false}
					data={workout}
					renderItem={({ item }) => {
							return (
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
                onPress={() => {navigation.navigate('WorkoutDetail')}}>
                  <View style={{padding: 5}}>
                    <Image source={{uri: item.image}} style={{width: 100, height: 150, alignSelf: 'center'}} />
                  </View>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>{item.title}</Text>
                    <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> {item.equipment}</Text>
                    <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> {item.calo} calo / phút</Text>
                    <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> {item.impact}</Text>
                  </View>
                </TouchableOpacity>
							);
					}}
					keyExtractor={(item, index) => index.toString()}
				/> */}
        <View style={{paddingBottom: 60}}></View>
      </ScrollView>
    )
}

export default Workout;