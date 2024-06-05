import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleGetFavoriteDishes } from '../../services/favorite/get_favorite_dishes';
import { handleGetRecipeByDishID } from "../../services/recipe/get_recipe_by_dish_id";
import { AuthContext } from "../../context/AuthContext";
import { setReminderNoti, removeReminderTime } from "../../asyncStorage/auth";
import { getTime } from "date-fns";
import { select } from "d3";
import { scheduleAlarm } from '../../services/notification/NotificationHandler';
import DateTimePicker from "react-native-modal-datetime-picker";


const convertTimeToDate = (timeString) => {
	const [time, modifier] = timeString.split(' ');
	let [hours, minutes, seconds] = time.split(':');
	if (modifier === 'PM' && hours !== '12') {
		hours = parseInt(hours, 10) + 12;
	}
	if (modifier === 'AM' && hours === '12') {
		hours = '00';
	}
	const now = new Date();
	now.setHours(hours);
	now.setMinutes(minutes);
	now.setSeconds(seconds);
	now.setMilliseconds(0);
	return now;
}


export const Clock = ({ reminderTime, onClose }) => {
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');

	useEffect(() => {
		if (reminderTime) {
			const date = convertTimeToDate(reminderTime);
			setSelectedDate(date);
		}
	}, [reminderTime]);

	const showDateTimePicker = () => {
		setIsDateTimePickerVisible(true);
	};

	const hideDateTimePicker = () => {
		setIsDateTimePickerVisible(false);
		onClose();
	};

	const handleDatePicked = async (date) => {
		await removeReminderTime();
		const timeS = date.toLocaleTimeString();
		const [time, period] = timeS.split(' ');
		const [hour, minute] = time.split(':').map(Number);
		const adjustedHour = period === 'PM' ? hour + 12 : hour;

		console.log(adjustedHour, minute);
		console.log("A date has been picked: ", timeS);
		await setReminderNoti(timeS);
		await scheduleAlarm(adjustedHour, minute);
		hideDateTimePicker();
		onClose(timeS);
	};

	return (
		<>
			<DateTimePicker
				mode="time"
				isVisible={isDateTimePickerVisible}
				onConfirm={handleDatePicked}
				onCancel={hideDateTimePicker}
				date={selectedDate ? new Date(selectedDate) : new Date()}
			/>
			{/* <Button title="Show DateTime Picker" onPress={showDateTimePicker} /> */}
		</>
	);
};
