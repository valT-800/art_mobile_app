import * as React from 'react';
import {  Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function OtherText({text}) {

  return (
      <Text style={styles.text}>{text}</Text>
  );
}
export default OtherText;
const styles = StyleSheet.create({
    text: {
        padding: 1,
        color: 'grey'
    }
})