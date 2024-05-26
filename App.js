
import React, { useState, useEffect, useRef } from 'react';
import { AppRouters } from './navigators/appRouters.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.js';
import { NavigationContainer, } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { loadAlarmFromStorage } from './services/notification/NotificationHandler.js';

// import { loadAlarmFromStorage } from './services/notification/NotificationHandler.js';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [notification, setNotification] = useState(null);
	const [alarmHour, setAlarmHour] = useState('');
	const [alarmMinute, setAlarmMinute] = useState('');
	const notificationListener = useRef();
	const [time, setTime] = useState('');

	const getTimeObject = (timeString) => {
		const [time, period] = timeString.split(' ');
		const [hour, minute] = time.split(':').map(Number);
		
		// Nếu là buổi chiều (PM) thì cộng thêm 12 giờ
		const adjustedHour = period === 'PM' ? hour + 12 : hour;
	  
		return { hour: adjustedHour, minute };
	  }
	  	  
	useEffect(() => {
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			setNotification(notification);
		});

		// Lắng nghe sự kiện thông báo được bấm để xóa thông báo đó
		Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response.notification.request.content.title);
		});

		setTime(loadAlarmFromStorage());
		if (time) {
			const { hour, minute } = getTimeObject(time);
			setAlarmHour(hour);
			setAlarmMinute(minute);
		}

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
		};
	}, []);

	useEffect(() => {
		// Đảm bảo rằng nếu có thông báo chưa được xem khi khởi động, nó vẫn được hiển thị
		const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
			console.log(response.notification.request.content.title);
		});

		return () => backgroundSubscription.remove();
	}, []);

	return (
		<AuthProvider>
			<NavigationContainer>
				<AppRouters />
			</NavigationContainer>
		</AuthProvider>
	);
}
