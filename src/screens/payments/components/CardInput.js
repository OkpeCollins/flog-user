import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { Ionicons } from '@expo/vector-icons';
import Visa from './Visa';
import Mastercard from './Mastercard';
import Verve from './Verve';

function CardInput({
  ref,
  backgroundColor = colors.white,
  height = hp(56),
  width = wp(311),
  paddingLeft = wp(16),
  iconName,
  iconColor,
  marginTop,
  placeholder,
  value,
  keyboardType,
  onChangeText,
  secureTextEntry,
  onSubmitEditing,
  textColor = colors.text.grey,
  multiline = false,
  numberOfLines,
  textAlignVertical,
  alignItems = 'center',
  inputMarginTop,
  rightIconName,
  cardType,
  maxLength,
}) {
  return (
    <View style={[styles.main, { marginTop, backgroundColor, height, width, paddingLeft, paddingRight: paddingLeft, alignItems }]}>
      {cardType === 'visa' ? (
            <Visa />
          ) : cardType === 'mastercard' ? <Mastercard /> : cardType === 'verve' ? <Verve /> : <Ionicons name={iconName} size={hp(18)} color={iconColor} />}
      <TextInput
        ref={ref}
        style={[styles.textInput, { color: textColor, height, textAlignVertical, marginTop: inputMarginTop }]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
      <TouchableOpacity>
        <Ionicons name={rightIconName} size={hp(20)} color={colors.text.lightGrey} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderRadius: wp(10),
  },
  textInput: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(13.5),
    fontSize: hp(16),
    fontWeight: '300',
    textAlign: 'left',
  },
})

export default CardInput;
