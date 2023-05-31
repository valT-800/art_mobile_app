
import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import NormalText from './NormalText';
import Divider from './Divider';

const TouchableListItem = ({onPress, title}) => {

  return (
    <View>
      <TouchableOpacity onPress={onPress} style= {{padding: 5, alignContent: 'center', alignItems: 'center'}}><NormalText text= {title}/></TouchableOpacity>
      <Divider/>
    </View>
  );
};

export default TouchableListItem;
