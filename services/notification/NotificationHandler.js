import React, { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import {getReminderTime} from '../../asyncStorage/auth';

export const loadAlarmFromStorage = async () => {
	try {
		const time = await getReminderTime();
		return time;
	} catch (error) {
		console.error("Failed to load alarm from AsyncStorage:", error);
	}
};

export const scheduleAlarm = async (alarmHour, alarmMinute) => {

	const now = new Date();
	const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(alarmHour), parseInt(alarmMinute), 0, 0);

	if (alarmTime < now) {
		alarmTime.setDate(alarmTime.getDate() + 1);
	}
	try {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Nhắc nhở",
				body: "Tới giờ! Uống nước thôi!",
			},
			trigger: { date: alarmTime },
		});
	} catch (error) {
		console.error("Failed to schedule alarm:", error);
	}
};
