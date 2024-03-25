import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/login';
import Signup from './screens/signup/signup';
import Activation from './screens/activation/activation';
import ForgotPassword from './screens/forgot_password/forgot_password';
import OtpPassword from './screens/otp_password/otp_password';
import ResetPassword from './screens/reset_password/reset_password';
import GetData from './screens/get_data/get_data';

function Home() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home Screen</Text>
		</View>
	);

}

const Stack = createNativeStackNavigator();

export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Login'>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="Activation" component={Activation} />
				<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
				<Stack.Screen name="OtpPassword" component={OtpPassword} />
				<Stack.Screen name="ResetPassword" component={ResetPassword} />
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
