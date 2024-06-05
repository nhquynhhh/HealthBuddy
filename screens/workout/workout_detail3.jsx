import { ScrollView, Text, View, Image, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from '../../utils/colors';
import { save_calories_exercise } from '../../services/api/api_save_calories';

export default function WorkoutDetail3() {
    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                const newElapsedTime = Date.now() - startTimeRef.current;
                setElapsedTime(newElapsedTime);
                setCaloriesBurned(Math.round((newElapsedTime / (1000 * 60)) * 7));
            }, 100);
        } else {
            clearInterval(intervalIdRef.current);
        }
        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]);

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;
        }
    };

    const stop = () => {
        if (isRunning) {
            setIsRunning(false);
        }
    };

    const reset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setCaloriesBurned(0);
    };

    const formatTime = () => {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    };

    const handleCaloWorkoutSubmit = () => {
        save_calories_exercise(caloriesBurned);
        Alert.alert('Workout Submitted', `You've burned ${caloriesBurned} calories!`);
        reset();
    };

	const handlePractice = () => {
		if (isRunning) {
			stop();
		} else {
			start();
		}
	}


    return (
        <ScrollView style={{ backgroundColor: colors.white, marginBottom: 60 }}>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Image source={{ uri: 'https://www.spotebi.com/wp-content/uploads/2014/10/jump-rope-exercise-illustration.gif' }} style={{ width: 150, height: 200, alignSelf: 'center' }} />
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: RFValue(19, 720), color: colors.blue }}>Jump Rope</Text>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', borderWidth: 1, borderColor: colors.blue }}>
                <View style={{ backgroundColor: colors.blue, flexDirection: 'row', padding: 15 }}>
                    {/* <TouchableOpacity style={{ paddingHorizontal: 2 }} onPress={start} delayPressIn={0}>
                        <Icon name='play' type='ionicon' color={colors.white} size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 2 }} onPress={stop} delayPressIn={0}>
                        <Icon name='pause' type='ionicon' color={colors.white} size={26} />
                    </TouchableOpacity> */}
					<TouchableOpacity style={{ paddingHorizontal: 2 }} onPress={handlePractice} delayPressIn={0}>
						{isRunning ? <Icon name='pause' type='ionicon' color={colors.white} size={26} /> : <Icon name='play' type='ionicon' color={colors.white} size={26} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ paddingHorizontal: 2 }} onPress={reset} delayPressIn={0}>
                        <Icon name='reload-sharp' type='ionicon' color={colors.white} size={26} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <Text style={{ fontSize: RFValue(20, 720), fontWeight: 'bold', textAlignVertical: 'center' }}>{formatTime()}</Text>
                    <Text style={{ fontSize: RFValue(20, 720), textAlignVertical: 'center' }}> ~ </Text>
                    <Text style={{ fontSize: RFValue(20, 720), fontWeight: 'bold', textAlignVertical: 'center', color: colors.red }}>{caloriesBurned}</Text>
                    <Text style={{ fontSize: RFValue(16, 720), textAlignVertical: 'center' }}> calo</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: elapsedTime === 0 ? colors.gray : colors.blue,
                        padding: 15,
                        borderRadius: 10,
                    }}
                    onPress={handleCaloWorkoutSubmit}
                    disabled={elapsedTime === 0}
                >
                    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: RFValue(16, 720) }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: colors.blue, alignSelf: 'center', padding: 15, width: windowWidth * 0.8, marginVertical: 20, borderRadius: 15, marginTop: 30 }}>
                <Text style={{ color: colors.white, textDecorationLine: 'underline', fontWeight: 'bold', fontSize: RFValue(16, 720) }}>Thông tin chung</Text>
                <Text style={{ paddingVertical: 5, color: colors.white, fontSize: RFValue(14, 720) }}><Text style={{ fontWeight: 'bold' }}>Dụng cụ:</Text> Dây nhảy</Text>
                <Text style={{ paddingVertical: 5, color: colors.white, fontSize: RFValue(14, 720) }}><Text style={{ fontWeight: 'bold' }}>Calories tiêu hao:</Text> 7 calo / phút</Text>
                <Text style={{ paddingVertical: 5, color: colors.white, fontSize: RFValue(14, 720) }}><Text style={{ fontWeight: 'bold' }}>Tác động:</Text> Chân, bụng, lưng, vai</Text>
            </View>
            <View style={{ alignSelf: 'center', padding: 15, width: windowWidth * 0.8, marginVertical: 10, borderWidth: 1, borderColor: colors.gray, borderRadius: 15 }}>
                <Text style={{ textDecorationLine: 'underline', fontWeight: 'bold', fontSize: RFValue(16, 720), marginBottom: 15 }}>Chi tiết bài tập</Text>
                <Text style={{ flexWrap: 'wrap', lineHeight: 30, textAlign: 'justify', fontSize: RFValue(14, 720) }}>
                    - Giữ dây đồng thời giữ tay ngang hông.
                    {"\n"}- Xoay cổ tay để vung dây và nhảy.
                    {"\n"}- Nhảy bằng cả hai chân cùng lúc, lần lượt từng chân một, xen kẽ giữa các chân, v.v. 
                    {"\n"}- Lặp lại cho đến khi hoàn thành.
                </Text>
            </View>
            <View style={{ paddingBottom: 60 }}></View>
        </ScrollView>
    );
}
