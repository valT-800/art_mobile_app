import * as React from 'react';
import {  Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

//Black background and white text in light theme, inverted on dark theme
export function NormalText({text}) {
    
    const { colors } = useTheme();
  return (
      <Text style={[styles.text,{ color: colors.text }]}>{text}</Text>
  );
}
export function OtherText({text}) {
    
    const { colors } = useTheme();

    return (
        <Text style={styles.otherText}>{text}</Text>
    );
}
export function BoldText({text}) {
    
    const { colors } = useTheme();

    return (
        <Text style={[styles.boldText,{ color: colors.text }]}>{text}</Text>
    );
}

export function Header({text}) {
    
const { colors } = useTheme();

    return (
        <Text style={[styles.header,{ color:colors.text }]}>{text}</Text>
    );
}
const styles = StyleSheet.create({
    text:{
        fontSize:15,
        padding:3
    },
    otherText: {
        padding: 1,
        color: 'grey'
    },
    boldText: {
        padding: 1,
        fontWeight: '600'
    },
    header: {
        fontSize:35,
        marginTop:20,
        paddingBottom:10,
        fontWeight:400
    }
})
