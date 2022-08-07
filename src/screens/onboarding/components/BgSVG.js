import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { hp, wp } from '../../../constants/dimension';

function BgSVG() {
  return (
    <Svg width={wp(360)} height={hp(327.5)} viewBox={`0 0 ${wp(360)} ${hp(327.5)}`} fill="none">
      <Path d="M-0.5 0C153.704 81.9146 222.655 85.6722 361.5 5.5V329H-0.5V0Z" fill="white" />
    </Svg>
  )
}

export default BgSVG;