import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { wp } from '../../constants/dimension';
import RideHistoryTopTab from './RideHistoryTopTab';

function RideHistory({navigation}) {
  return (
    <View style={styles.main}>
      <Header
        backgroundColor={colors.blackBg}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.white, onpress: () => navigation.goBack() }}
        middleComponent={{ title: 'Ride History', color: colors.text.white }}
      />
      <View style={styles.content}>
        <RideHistoryTopTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    width: wp(360),
    backgroundColor: colors.blackBg,
  },
  content: {
    flex: 1,
    width: wp(360),
  },
  title: {
  },
})

export default RideHistory;
