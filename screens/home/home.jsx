import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../../services/context/useAuth';


function Home({ navigation}) {
	const { removeAccessToken, removeRefreshToken } = useAuth();

	const handleLogout = () => {
		removeAccessToken();
		removeRefreshToken();
		navigation.navigate('Login');
	}

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home Screen</Text>
			<Button>
				title="Logout"
				onPress={handleLogout()}
			</Button>
		</View>
	);
}

export default Home;