import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import { colors } from './colors'
import Home from './screens/home/home';
import Statistics from './screens/statistics/statistics';
import Scan from './screens/scan/scan';
import Notifications from './screens/notifications/notifications';
import Personal from './screens/personal/personal';
import Calories from './screens/calories/calories';
import Water from './screens/water/water';
import Workout from './screens/workout/workout';
import BodyIndex from './screens/body_index/body_index';
import FavouriteFood from './screens/fav_food/fav_food';
import MenuSuggestion from './screens/menu_suggest/menu_suggest';
import Search from './screens/search/search';
import Premium from './screens/premium/premium';

const HomeStack = createNativeStackNavigator();
function HomeStackScreens(){
    return(
        <HomeStack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle:{fontWeight: 'bold'}}}>
            <HomeStack.Screen name="Home" component={Home} options={{headerShown: false}}/> 
            <HomeStack.Screen name="Calories" component={Calories} options={{headerTitle: "Kiểm soát Calories"}}/>
            <HomeStack.Screen name="Water" component={Water} options={{headerTitle: "Theo dõi uống nước"}}/>
            <HomeStack.Screen name="Workout" component={Workout} options={{headerTitle: "Vận động cơ thể"}}/>
            <HomeStack.Screen name="BodyIndex" component={BodyIndex} options={{headerTitle: "Chỉ số cơ thể"}}/>
            <HomeStack.Screen name="FavouriteFood" component={FavouriteFood} options={{headerTitle: "Món ăn yêu thích"}}/>
            <HomeStack.Screen name="MenuSuggestion" component={MenuSuggestion} options={{headerTitle: "Gợi ý thực đơn"}}/>
            <HomeStack.Screen name="Search" component={Search} options={{headerTitle: "Tra cứu"}}/>
        </HomeStack.Navigator>
    )
}

const PersonalStack = createNativeStackNavigator();
function PersonalStackScreens(){
    return(
        <PersonalStack.Navigator screenOptions={{headerTitleAlign: 'center', headerTitleStyle:{fontWeight: 'bold'}}}>
            <PersonalStack.Screen name="Personal" component={Personal} options={{headerTitle: "Tài khoản của tôi"}}/>
            <PersonalStack.Screen name="Premium" component={Premium} options={{headerTitle: "Nâng cấp tài khoản"}}/>
        </PersonalStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();
function BottomNavigation() {
	const screenOptions = {
		tabBarShowLabel:false,
		headerShown:false,
		tabBarStyle:{
			position: "absolute",
			bottom: 0,
			right: 0,
			left: 0,
			elevation: 0,
			height: 60,
			background: "#fff"
		}
	}
	return (
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen name="HomeTab" 
                    component={HomeStackScreens} 
                    options={{
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Icon name={focused ? "home" : "home-outline"} type="ionicon" size={23} color={focused ? colors.blue: colors.black} />
                                    <Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Trang chủ</Text>
                                </View>
                    )}}}/>
                <Tab.Screen name="StatisticsTab" 
                    component={Statistics} 
                    options={{
                        headerTitle: "Thống kê",
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Icon name={focused ? "stats-chart-sharp" : "stats-chart-outline"} type="ionicon" size={23} color={focused ? colors.blue: colors.black} />
                                    <Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Thống kê</Text>
                                </View>
                    )}}}/>
                <Tab.Screen name="ScanTab" 
                    component={Scan} 
                    options={{ tabBarIcon: ({focused})=>{
                        return (
                            <LinearGradient
                                colors={[colors.blue, colors.lightBlue]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0.5, y: 0 }}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 60,
                                    height: 60,
                                    borderRadius: 15,
                                    top: -30
                                }}>
                                <Icon name="scan-helper" type="material-community" size={35} color="white" />
                            </LinearGradient>
                        )
                    }
                }}/>
                <Tab.Screen name="NotiTab" 
                    component={Notifications} 
                    options={{
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Icon name={focused ? "notifications" : "notifications-outline"} type="ionicon" size={23} color={focused ? colors.blue: colors.black} />
                                    <Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Thông báo</Text>
                                </View>
                    )}}}/>
                <Tab.Screen name="PersonalTab" 
                    component={PersonalStackScreens} 
                    options={{
                        tabBarIcon: ({focused})=>{
                            return (
                                <View style={{alignItems: "center", justifyContent: "center"}}> 
                                    <Icon name={focused ? "person": "person-outline"} type="ionicon" size={23} color={focused ? colors.blue: colors.black} />
                                    <Text style={{ fontSize: 12, color: focused ? colors.blue : colors.black, marginTop: 4, fontWeight: focused ? 'bold' : 'normal' }}>Cá nhân</Text>
                                </View>
                    )}}}/>
            </Tab.Navigator>
    )
}


export default function App(){
    return (
		<NavigationContainer>
			<BottomNavigation/>
		</NavigationContainer>
    );
};