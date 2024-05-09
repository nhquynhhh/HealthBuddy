import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, TextInput, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

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

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Lắng nghe sự kiện thông báo được bấm để xóa thông báo đó
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response.notification.request.content.title);
    });

    loadAlarmFromStorage();

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

  const loadAlarmFromStorage = async () => {
    try {
      const storedAlarmHour = await AsyncStorage.getItem('alarmHour');
      const storedAlarmMinute = await AsyncStorage.getItem('alarmMinute');
      if (storedAlarmHour && storedAlarmMinute) {
        setAlarmHour(storedAlarmHour);
        setAlarmMinute(storedAlarmMinute);
      }
    } catch (error) {
      console.error("Failed to load alarm from AsyncStorage:", error);
    }
  };

  const saveAlarmToStorage = async () => {
    try {
      await AsyncStorage.setItem('alarmHour', alarmHour);
      await AsyncStorage.setItem('alarmMinute', alarmMinute);
    } catch (error) {
      console.error("Failed to save alarm to AsyncStorage:", error);
    }
  };

  const clearAlarmFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('alarmHour');
      await AsyncStorage.removeItem('alarmMinute');
      setAlarmHour('');
      setAlarmMinute('');
      Alert.alert('Alarm Cleared', 'Alarm has been cleared.');
    } catch (error) {
      console.error("Failed to clear alarm from AsyncStorage:", error);
    }
  };

  const scheduleAlarm = async () => {
    if (!alarmHour || !alarmMinute) {
      Alert.alert('Missing Information', 'Please enter both hour and minute.');
      return;
    }

    saveAlarmToStorage();

    const now = new Date();
    const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(alarmHour), parseInt(alarmMinute), 0, 0);

    if (alarmTime < now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm",
          body: "Tới giờ! Ghi chú calories thoi!",
        },
        trigger: { date: alarmTime },
      });
      Alert.alert('Alarm Set', `Alarm set for ${alarmHour}:${alarmMinute}.`);
    } catch (error) {
      console.error("Failed to schedule alarm:", error);
      Alert.alert('Error', 'Failed to schedule alarm.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
      </View>
      <View>
        <Text>{alarmHour && alarmMinute ? `Alarm set for ${alarmHour}:${alarmMinute}` : "No alarm set"}</Text>
        <TextInput
          placeholder="Hour"
          keyboardType="numeric"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
          value={alarmHour}
          onChangeText={text => setAlarmHour(text)}
        />
        <TextInput
          placeholder="Minute"
          keyboardType="numeric"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
          value={alarmMinute}
          onChangeText={text => setAlarmMinute(text)}
        />
        <Button
          title="Set Alarm"
          onPress={scheduleAlarm}
        />
        <Button
          title="Clear Alarm"
          onPress={clearAlarmFromStorage}
        />
      </View>
    </View>
  );
}

// Đăng ký headless task
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Xử lý headless task
Notifications.registerTaskAsync('showAlarmNotification', async ({ notificationId, payload }) => {
  const now = new Date();
  const { hour, minute } = payload;

  const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hour), parseInt(minute), 0, 0);

  if (alarmTime < now) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alarm",
        body: "Wake up! It's time!",
      },
      trigger: { date: alarmTime },
    });
  } catch (error) {
    console.error("Failed to schedule alarm:", error);
  }

  return Promise.resolve();
});
