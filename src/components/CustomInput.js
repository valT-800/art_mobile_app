import * as React from 'react';
import {  Text, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function CustomInput({style, value, placeholder, textContentType, onChangeText, autoCapitalize, secureTextEntry}) {
  const { colors } = useTheme();

  return (
      <TextInput style={[styles.text, style, { borderColor: colors.border, color: colors.text}]}
        placeholderTextColor={colors.border}
            onChangeText={onChangeText}
            placeholder={placeholder}
            textContentType={textContentType}
            value={value}
            autoCapitalize = {autoCapitalize}
            secureTextEntry={secureTextEntry}
            maxLength={100}
            blurOnSubmit={false}
            autoFocus={true}
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