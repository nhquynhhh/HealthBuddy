import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';

export default function Workout() {
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
        <View>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
            onPress={() => {navigation.navigate('WorkoutDetail')}}>
            <View style={{padding: 5}}>
              <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 100, height: 150, alignSelf: 'center'}} />
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>180 Jump Squat</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
            onPress={() => {navigation.navigate('WorkoutDetail')}}>
            <View style={{padding: 5}}>
              <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 100, height: 150, alignSelf: 'center'}} />
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>180 Jump Squat</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
            onPress={() => {navigation.navigate('WorkoutDetail')}}>
            <View style={{padding: 5}}>
              <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 100, height: 150, alignSelf: 'center'}} />
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>180 Jump Squat</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
            onPress={() => {navigation.navigate('WorkoutDetail')}}>
            <View style={{padding: 5}}>
              <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 100, height: 150, alignSelf: 'center'}} />
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>180 Jump Squat</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
            onPress={() => {navigation.navigate('WorkoutDetail')}}>
            <View style={{padding: 5}}>
              <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 100, height: 150, alignSelf: 'center'}} />
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>180 Jump Squat</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', padding: 2, borderColor: colors.gray, borderWidth: 1, width: windowWidth * 0.9, alignSelf: 'center', borderRadius: 20, marginTop: 20}}
            onPress={() => {navigation.navigate('WorkoutDetail')}}>
            <View style={{padding: 5}}>
              <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 100, height: 150, alignSelf: 'center'}} />
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: RFValue(16, 720), marginVertical: 2}}>180 Jump Squat</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
              <Text style={{color: colors.darkGray, paddingVertical: 5, fontSize: RFValue(12, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingBottom: 60}}></View>
      </ScrollView>
    )
}