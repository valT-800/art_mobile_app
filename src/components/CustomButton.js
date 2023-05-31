import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// Black background and white text in light theme, inverted on dark theme
function CustomButton({title, onPress}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]} onPress = {onPress}>
      <Text style={{ color: colors.text }}>{title}</Text>
    </TouchableOpacity>
  );
}
export default CustomButton;
const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 10,
        margin: 5,
    }
})