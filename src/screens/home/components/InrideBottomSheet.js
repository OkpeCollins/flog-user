import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';

function InrideBottomSheet() {
  return (
    <View style={styles.main}>
      <View style={styles.sheetContainer}>
        <View style={styles.dragger} />
        <View style={styles.btnContainer}>
          <Button title={'Driving to your destination'} onPress={() => console.log('yes yes yes')} />
        </View>
        <View style={styles.newTripContainer}>
          <View style={styles.newTripQus}>
            <Text style={styles.newTripTitle}>New Trip?</Text>
            <Text style={styles.newTripDesc}>Do you want to order another ride?</Text>
          </View>
          <View style={styles.newTripBtn}>
            <Button
              title={'Yes'}
              width={wp(98)}
              height={hp(47)}
              borderRadius={hp(34)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: wp(360),
  },
  sheetContainer: {
    // flex: 1,
    alignItems: 'center',
    height: hp(270),
    width: wp(360),
    paddingHorizontal: wp(20),
    borderTopLeftRadius: wp(34),
    borderTopRightRadius: wp(34),
    backgroundColor: colors.blackBg,
  },
  dragger: {
    marginTop: hp(9),
    width: wp(113),
    height: hp(8),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  btnContainer: {
    marginTop: hp(97),
  },
  newTripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(26),
    paddingBottom: hp(15.5),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  newTripQus: {
    flex: 1,
  },
  newTripTitle: {
    fontSize: hp(22),
    fontWeight: '700',
    color: colors.white,
  },
  newTripDesc: {
    fontSize: hp(12),
    fontWeight: '500',
    marginTop: hp(4),
    color: colors.grey,
  },
  newTripBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

export default InrideBottomSheet;
