import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function ContentHeader({height, title, fontSize = hp(14)}) {
  return (
    <View style={[style.main, {height}]}>
      <Text style={[style.title, {fontSize}]} >{title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: wp(13),
    width: wp(360),
    backgroundColor: colors.contentHeader,
  },
  title: {
    fontWeight: '700',
    color: colors.text.white,
    textTransform: 'capitalize',
  },
})

export default React.memo(ContentHeader);
