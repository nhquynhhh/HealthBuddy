import { View, Text, StyleSheet, Image } from "react-native";
function NoResults({height}) {
    return ( 
        <View style={styles.container}>
            <Image source={require('../../assets/img_no_results.png')} 
            style={{
                width: "100%", 
                flex: 1,
                height: height,
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