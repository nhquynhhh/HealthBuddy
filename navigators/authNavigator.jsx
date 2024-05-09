import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/login';
import Signup from '../screens/signup/signup';
import Activation from '../screens/activation/activation';
import ForgotPassword from '../screens/forgot_password/forgot_password';
import OTPForgotPassword from '../screens/otp_password/otp_password';
import ResetPassword from '../screens/reset_password/reset_password';
import GetData from '../screens/get_data/get_data';

import React from 'react';

const AuthNavigator = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Signup" component={Signup} />
			<Stack.Screen name="Activation" component={Activation} />
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
			<Stack.Screen name="OTPForgotPassword" component={OTPForgotPassword} />
			<Stack.Screen name="ResetPassword" component={ResetPassword} />
			<Stack.Screen name="GetData" component={GetData} />
		</Stack.Navigator>
	)
}
export default AuthNavigator;