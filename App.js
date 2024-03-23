import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/login';

export default function App() {
  return (
    <View>
      <Login></Login>
      <StatusBar style="auto" />
    </View>
  );
}
