import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { hp, wp } from '../../constants/dimension';

function Splash() {
  return (
    <View style={{flex: 1,}}>
      <Image
        style={{resizeMode: 'cover', width: wp(360), height: hp(720)}}
        source={require('../../asset/splash.png')}
      />
    </View>
  );
}

export default Splash;
