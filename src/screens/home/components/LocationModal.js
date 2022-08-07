import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function LocationModal() {
  return (
    <View style={styles.main}>
      <GooglePlacesAutocomplete />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'absolute',
    width: wp(360),
    height: hp(720) + StatusBar.currentHeight,
    backgroundColor: colors.grey,
    paddingTop: hp(90),
  }
})

export default LocationModal;
