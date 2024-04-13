import { View, Text, StyleSheet, Image } from "react-native";
function NoResults() {
    return ( 
        <View style={styles.container}>
            <Image source={require('../../assets/img_no_results.png')} 
            style={{
                width: "100%", 
                height: 400, 
                flex: 1
            }}
            resizeMode="contain"/>
        </View>
     );
}
const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default NoResults;