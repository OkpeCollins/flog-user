import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../constants/dimension';
import { Ionicons } from '@expo/vector-icons';

function Input({
  // ref,
  backgroundColor = colors.white,
  height = hp(48),
  width = wp(315),
  paddingLeft = wp(21.5),
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
  editable = true,
  onFocus,
  style
}) {
  return (
    <View style={[styles.main, { marginTop, backgroundColor, height, width, paddingLeft, paddingRight: paddingLeft, alignItems }, style]}>
      <Ionicons name={iconName} size={hp(16)} color={iconColor} style={{ marginTop: inputMarginTop }} />
      <TextInput
        // ref={ref}
        style={[styles.textInput, { color: textColor, height, textAlignVertical, marginTop: inputMarginTop }]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        multiline={multiline}
        returnKeyType={'done'}
        numberOfLines={numberOfLines}
        editable={editable}
        onFocus={onFocus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    borderRadius: wp(6),
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

export default React.memo(Input);
