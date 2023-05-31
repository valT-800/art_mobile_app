import * as React from 'react';
import {  Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function NormalText({text}) {
  const { colors } = useTheme();

  return (
      <Text style={[styles.text,{ color: colors.text }]}>{text}</Text>
  );
}
export default NormalText;
const styles = StyleSheet.create({
    text: {
        padding: 1,
    }
})