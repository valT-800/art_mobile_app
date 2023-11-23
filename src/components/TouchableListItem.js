
import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {NormalText} from './AppTextComponents';
import Divider from './Divider';

export default TouchableListItem = ({onPress, title}) => {

  return (
    <View>
      <TouchableOpacity onPress={onPress} style= {{padding: 5, alignContent: 'center', alignItems: 'center'}}><NormalText text= {title}/></TouchableOpacity>
      <Divider/>
    </View>
  );
};

