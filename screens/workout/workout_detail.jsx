import { ScrollView, Text, View, Image, useWindowDimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component, useState, useEffect, useRef, useCallback } from 'react'
import { SearchBar, Icon, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';


export default function WorkoutDetail() {
    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }
        return() => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);
    
    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60 ) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <ScrollView style={{backgroundColor: colors.white, marginBottom: 60}}>
            <View style={{marginTop: 20, marginBottom: 10}}>
                <Image source={{uri: 'https://www.spotebi.com/wp-content/uploads/2016/12/180-jump-squat-exercise-illustration-spotebi.gif'}} style={{width: 150, height: 200, alignSelf: 'center'}} />
            </View>
            <View style={{marginBottom: 20}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(19, 720), color: colors.blue}}>180 Jump Squat</Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center', borderWidth: 1, borderColor: colors.blue}}>
                <View style={{backgroundColor: colors.blue, flexDirection: 'row', padding: 15}}>
                    <View>
                        <TouchableOpacity style={{paddingHorizontal: 2}} onPress={start} delayPressIn={0}>
                            <Icon name='play' type='ionicon' color={colors.white} size={26} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{paddingHorizontal: 2}} onPress={stop} delayPressIn={0}>
                            <Icon name='pause' type='ionicon' color={colors.white} size={26} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={{paddingHorizontal: 2}} onPress={reset} delayPressIn={0}>
                            <Icon name='reload-sharp' type='ionicon' color={colors.white} size={26} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', padding: 10}}>
                    <Text style={{fontSize: RFValue(20, 720), fontWeight: 'bold', textAlignVertical: 'center'}}>{formatTime()}</Text>
                    <Text style={{fontSize: RFValue(20, 720), textAlignVertical: 'center'}}> ~ </Text>
                    <Text style={{fontSize: RFValue(20, 720), fontWeight: 'bold', textAlignVertical: 'center', color: colors.red}}>00</Text>
                    <Text style={{fontSize: RFValue(16, 720), textAlignVertical: 'center'}}> calo</Text>
                </View>
            </View>
            <View style={{backgroundColor: colors.blue, alignSelf: 'center', padding: 15, width: windowWidth * 0.8, marginVertical: 20, borderRadius: 15, marginTop: 30}}>
                <Text style={{color: colors.white, textDecorationLine: 'underline', fontWeight: 'bold', fontSize: RFValue(16, 720)}}>Thông tin chung</Text>
                <Text style={{paddingVertical: 5, color: colors.white, fontSize: RFValue(14, 720)}}><Text style={{fontWeight: 'bold'}}>Dụng cụ:</Text> Không</Text>
                <Text style={{paddingVertical: 5, color: colors.white, fontSize: RFValue(14, 720)}}><Text style={{fontWeight: 'bold'}}>Calories tiêu hao:</Text> 8 calo / phút</Text>
                <Text style={{paddingVertical: 5, color: colors.white, fontSize: RFValue(14, 720)}}><Text style={{fontWeight: 'bold'}}>Tác động:</Text> Bụng, lưng dưới, đùi</Text>
            </View>
            <View style={{alignSelf: 'center', padding: 15, width: windowWidth * 0.8, marginVertical: 10, borderWidth: 1, borderColor: colors.gray, borderRadius: 15}}>
                <Text style={{textDecorationLine: 'underline', fontWeight: 'bold', fontSize: RFValue(16, 720), marginBottom: 15}}>Chi tiết bài tập</Text>
                <Text style={{flexWrap: 'wrap', lineHeight: 30, textAlign: 'justify', fontSize: RFValue(14, 720)}}>
                    - 2 đầu gối hơi gập, 2 chân giơ hơi cao lên để thân người và chân tạo thành hình chữ V.
                    {"\n"}- Để thân người hơi nghiêng về phía sau, 2 tay duỗi thẳng về phía trước hoặc đan vào nhau để trước ngực, ngang với chiều cao của vai.
                    {"\n"}- Giữ nguyên mông trên sàn. Vặn thân người và 2 tay sang trái, đồng thời hơi vặn 2 đầu gối sang phải.
                    {"\n"}- Lặp lại động tác tương tự với bên phải. Rồi quay trở lại vị trí ban đầu. Lưu ý, trong toàn bộ các động tác tập luyện, bạn cần giữ nguyên vị trí 2 tay và căng cứng cơ bụng.
                </Text>
            </View>
            <View style={{paddingBottom: 60}}></View>
        </ScrollView>
    )
}