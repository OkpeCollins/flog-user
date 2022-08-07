import React from 'react';
import Svg, { Path, G, Rect, Defs } from 'react-native-svg';
import { hp, wp } from '../../../constants/dimension';

function DashLine() {
  return (
    <Svg width={wp(1)} height={hp(29)} viewBox="0 0 1 29" fill="none">
      <Path d="M0.5 0.5V27.5185" stroke="#CED0D2" stroke-linecap="round" stroke-linejoin="bevel" stroke-dasharray="1 4"/>
    </Svg>
  )
}

export default DashLine;