import * as React from 'react';
import {  Text, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function CustomInput({value, placeholder, textContentType, onChangeText}) {
  const { colors } = useTheme();

  return (
      <TextInput style={[styles.text,{ placeholderTextColor: colors.text, borderColor: colors.border}]}
                onChangeText={onChangeText}
                placeholder={placeholder}
                textContentType={textContentType}
                value={value}
      />
  );
}
export default CustomInput;
const styles = StyleSheet.create({
    text: {
        padding: 1,
        height: 40,
        width: '80%',
        borderWidth: 1,
        padding: 8,
        marginBottom: 15
    }
})