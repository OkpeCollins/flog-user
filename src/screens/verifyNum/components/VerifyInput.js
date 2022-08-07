import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function VerifyInput({
  textRef,
  marginHorizontal,
  placeholder,
  value,
  keyboardType,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  returnKeyType,
  onKeyPress,
}) {
  return (
    <View style={[styles.main, { marginHorizontal }]}>
      <TextInput
        ref={textRef}
        style={[styles.textInput]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        returnKeyType={returnKeyType}
        maxLength={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    width: wp(40),
    height: hp(40),
    borderColor: colors.white,
    borderWidth: hp(1),
  },
  textInput: {
    textAlign: 'center',
    color: colors.text.white,
    width: wp(40),
    height: hp(40),
  },
  text: {
    fontSize: hp(16),
    fontWeight: '300',
  },
})

export default VerifyInput;
