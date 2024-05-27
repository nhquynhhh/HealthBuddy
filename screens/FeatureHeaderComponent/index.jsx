import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../../utils/colors";

export const FeatureHeaderComponent = ({title}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
            {/* <Ionicons style={styles.add} name="arrow-back-circle-outline" size={40} color="green"></Ionicons> */}
            <AntDesign name="caretleft" size={24} color={colors.blue} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex", flexDirection: "row", marginVertical:25, alignItems: "center", gap: 18, 
        marginHorizontal: 10, marginTop: 40
    },
    title:{
        fontWeight: "bold", fontSize: 16, textTransform: 'uppercase',
    },
    
    
  });
  