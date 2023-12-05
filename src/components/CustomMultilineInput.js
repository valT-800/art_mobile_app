import * as React from 'react';
import {  Text, StyleSheet, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function CustomMultilineInput({style, value, placeholder, textContentType, onChangeText, autoCapitalize, secureTextEntry}) {
  const { colors } = useTheme();

  return (
      <TextInput style={[styles.container, style, { color: colors.text}]}
            placeholderTextColor={colors.border}
            onChangeText={onChangeText}
            placeholder={placeholder}
            textContentType={textContentType}
            value={value}
            maxLength={1024}
            autoCapitalize = {autoCapitalize}
            secureTextEntry={secureTextEntry}
            multiline
      />
  );
}
export default CustomMultilineInput;
const styles = StyleSheet.create({
    container: {
        padding:10,
        textAlign: 'left',
        maxHeight: 100
    }
})