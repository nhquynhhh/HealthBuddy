import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../utils/colors';

const GradientCirclePreviousButton = ({ onPress }) => {
    return (
      <Button title={" Quay lại"}
        icon={{ name: 'leftcircleo', type: 'antdesign', color: colors.white, size: 16 }}
        titleStyle={{ fontWeight: 'bold', fontSize: 14, color: colors.white }}
        buttonStyle={{ width: 100, height: 40, borderRadius: 50,}}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [colors.blue, colors.lightBlue],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }}
        onPress={onPress}>
      </Button>
    )
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 3
  },
  gradient: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
});

export default GradientCirclePreviousButton;