import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function SupportOpt({title, onPress}) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.main}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <Ionicons name={'chevron-forward'} size={hp(18)} color={colors.text.white} />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(335),
  },
  textContainer: {

  },
  text: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.white,
    textTransform: 'capitalize',
  },
})

export default SupportOpt;
