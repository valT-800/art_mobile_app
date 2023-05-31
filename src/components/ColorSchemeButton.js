// ColorSchemeButton.js

import React, { useContext } from 'react';
import { CustomColorSchemeContext } from '../screens/CustomColorScheme';
import { TouchableOpacity, View } from 'react-native';
import NormalText from './NormalText';
import TouchableListItem from './TouchableListItem';

const ColorSchemeButton = () => {
  const {colorScheme, setCustomColorScheme } = useContext(CustomColorSchemeContext);

  const handleColorSchemeChange = (scheme) => {
    setCustomColorScheme(scheme);
  };

  return (
    <View>
      <TouchableListItem onPress={() => {colorScheme==='dark' ? handleColorSchemeChange('light') : handleColorSchemeChange('dark')}} title= 'Change theme'></TouchableListItem>
    </View>
  );
};

export default ColorSchemeButton;
