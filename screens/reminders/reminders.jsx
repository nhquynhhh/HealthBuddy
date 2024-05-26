import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    loadAlarmsFromStorage();
  }, []);

  const loadAlarmsFromStorage = async () => {
    try {
      const storedAlarms = await AsyncStorage.getItem('alarms');
      if (storedAlarms) {
        setAlarms(JSON.parse(storedAlarms));
      }
    } catch (error) {
      console.error("Failed to load alarms from AsyncStorage:", error);
    }
  };

  const saveAlarmsToStorage = async () => {
    try {
      await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
      console.log("Alarms saved to AsyncStorage:", alarms);
    } catch (error) {
      console.error("Failed to save alarms to AsyncStorage:", error);
    }
  };

  const clearAlarmsFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('alarms');
      setAlarms([]);
      Alert.alert('Alarms Cleared', 'All alarms have been cleared.');
    } catch (error) {
      console.error("Failed to clear alarms from AsyncStorage:", error);
    }
  };

  const scheduleAlarm = async (hour, minute) => {
    const now = new Date();
    const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hour), parseInt(minute), 0, 0);

    if (alarmTime < now) {
      alarmTime.setDate(alarmTime.getDate() + 1);
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm",
          body: "It's time to do something!",
        },
        trigger: { date: alarmTime },
      });
      Alert.alert('Alarm Set', `Alarm set for ${hour}:${minute}.`);
    } catch (error) {
      console.error("Failed to schedule alarm:", error);
      Alert.alert('Error', 'Failed to schedule alarm.');
    }
  };

  const addAlarm = () => {
    if (!hour || !minute) {
      Alert.alert('Missing Information', 'Please enter both hour and minute.');
      return;
    }
  
    const newAlarm = { hour, minute };
    const newAlarms = [...alarms, newAlarm];
    setAlarms(newAlarms);
    saveAlarmsToStorage().then(() => {
      scheduleAlarm(newAlarm.hour, newAlarm.minute);
      setHour('');
      setMinute('');
    });
  };
  
  const removeAlarm = async (index) => {
    const newAlarms = alarms.filter((alarm, i) => i !== index);
    setAlarms(newAlarms);
    saveAlarmsToStorage();
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View>
        <Text>{alarms.length > 0 ? "Alarms:" : "No alarms set"}</Text>
        {alarms.map((alarm, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{`${alarm.hour}:${alarm.minute}`}</Text>
            <Button
              title="Remove"
              onPress={() => removeAlarm(index)}
            />
          </View>
        ))}
        <TextInput
          placeholder="Hour"
          keyboardType="numeric"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
          value={hour}
          onChangeText={text => setHour(text)}
        />
        <TextInput
          placeholder="Minute"
          keyboardType="numeric"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, textAlign: 'center' }}
          value={minute}
          onChangeText={text => setMinute(text)}
        />
        <Button
          title="Add Alarm"
          onPress={addAlarm}
        />
        <Button
          title="Clear Alarms"
          onPress={clearAlarmsFromStorage}
        />
      </View>
    </View>
  );
}
