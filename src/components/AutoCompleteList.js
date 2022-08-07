import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';

function AutoCompleteListView({onPress, title}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.option}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Ionicons name={'chevron-forward'} color={colors.text.white} size={hp(18)} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    marginTop: hp(8),
    // backgroundColor: colors.offlineScreenGrey,
    height: hp(45),
  },
  optionTitle: {
    fontSize: wp(14),
    fontWeight: '700',
    color: colors.text.white
  }
})

export default AutoCompleteListView;
