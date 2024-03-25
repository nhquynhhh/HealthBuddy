import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/login';
import Signup from './screens/signup/signup';
import Activation from './screens/activation/activation';
import ForgotPassword from './screens/forgot_password/forgot_password';
import OtpPassword from './screens/otp_password/otp_password';
import ResetPassword from './screens/reset_password/reset_password';
import GetData from './screens/get_data/get_data';

export default function App() {
  return (
    <View>
      <GetData />
      <StatusBar style="auto" />
    </View>
  );
}
