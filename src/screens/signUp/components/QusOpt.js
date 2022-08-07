import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp } from '../../../constants/dimension';

function QusOpt({ question, onPress, option }) {
  return (
    <View style={style.qusopt}>
      <Text style={style.question}>{question}?</Text>
      <TouchableOpacity style={style.signinOption} onPress={onPress}>
        <Text style={style.optionText}> {option}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  qusopt: {
    display: 'flex',
    flexDirection: 'row',
  },
  question: {
    fontSize: hp(16),
    fontWeight: '300',
    color: colors.text.grey
  },
  signinOption: {},
  optionText: {
    fontSize: hp(16),
    fontWeight: '500',
    fontWeight: 'bold',
    color: colors.mainColor,
  },
});

export default QusOpt;
