import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getReminderTime, setReminderNoti, removeReminderTime } from '../../asyncStorage/auth';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
	  shouldShowAlert: true,
	  shouldPlaySound: false,
	  shouldSetBadge: false,
	}),
  });
  
export const scheduleAlarm = async () => {
	const alarmTime = await getReminderTime();

	if (!alarmTime) {
		return;
	}

	const now = new Date();
	const alarmHour = alarmTime.split(':')[0];
	const alarmMinute = alarmTime.split(':')[1];
	let hours24 = parseInt(alarmHour);
	if (alarmTime.includes('PM') && hours24 !== 12) {
		hours24 += 12;
	}
	const alarmTime24 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours24, parseInt(alarmMinute), 0, 0);

	if (alarmTime24 < now) {
		alarmTime24.setDate(alarmTime24.getDate() + 1);
	}

	try {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Thông báo",
				body: "Đến lúc uống nước rồi!",
			},
			trigger: { date: alarmTime24 },
		});
	} catch (error) {
		console.error("Failed to schedule alarm:", error);
	}
};

export const cancelAlarm = async () => {
	await Notifications.cancelAllScheduledNotificationsAsync();
};

export const handleNotification = async () => {
	Alert.alert("Thông báo", "Đến lúc uống nước rồi!");
	await scheduleAlarm();
};