import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { wp } from '../constants/dimension';

function Star({color, onPress, size=wp(10), disabled}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Ionicons name={'star'} size={size} color={color} style={{ marginRight: wp(2.5), }} />
    </TouchableOpacity>
  );
}

export default Star;
