import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { setReminderNoti, removeReminderTime } from "../../asyncStorage/auth";
import { getTime } from "date-fns";
import { scheduleAlarm } from '../../services/notification/NotificationHandler';

export default function Clock({ reminderTime, onClose }) {
	const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(true);
	const [selectedDate, setSelectedDate] = useState('');

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
	};

	useEffect(() => {
		if (reminderTime) {
			const date = convertTimeToDate(reminderTime);
			setSelectedDate(date);
		}
	}, [reminderTime]);

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

		setIsDateTimePickerVisible(false);
		onClose(timeS); // Assuming onClose is a callback to update the parent component
	};

	return (
		<DateTimePicker
			mode="time"
			isVisible={isDateTimePickerVisible}
			onConfirm={handleDatePicked}
			onCancel={() => {
				setIsDateTimePickerVisible(false);
				onClose();
			}}
			date={selectedDate ? new Date(selectedDate) : new Date()}
		/>
	);
}
