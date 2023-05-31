import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

const tabBarIcon = name => ({ tintColor }) => (
  <Ionicons
    style={{ backgroundColor: 'transparent' }}
    name= {name}
    color={tintColor}
    size={40}
  />
);

export default tabBarIcon;
