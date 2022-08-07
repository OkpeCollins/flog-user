import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { Ionicons} from '@expo/vector-icons';
import { mockStars } from '../../../constants/testData';
import DashLine from './DashLine';
import Dash from 'react-native-dash';


function HistoryCard({marginTop, location, destination, status, price, date, onPress, rating}) {
  function Star({ color, onPress }) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={'star'} size={wp(10)} color={color} style={{ marginRight: wp(2.5), }} />
      </TouchableOpacity>
    )
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.main, {marginTop}]}>
        <View style={styles.left}>
          <Ionicons name={'location'} size={hp(16.92)} />
          {/* <View style={styles.leftLine} /> */}
          {/* <DashLine /> */}
          <Dash
            dashThickness={wp(1)}
            dashGap={hp(3)}
            dashLength={hp(2)}
            dashColor={colors.historyBorder}
            dashStyle={{ borderRadius: 10, }} style={styles.leftLine}
          />
          <Ionicons name={'paper-plane'} size={hp(16.92)} />
        </View>
        <View style={styles.middle}>
          <Text style={styles.middleLocation} numberOfLines={1}>{location}</Text>
          <Text style={styles.middleDestination} numberOfLines={1}>{destination}</Text>
        </View>
        <View style={styles.right}>
          <View style={styles.rightMainText}>
            <Text style={status === 'ongoing' ? styles.onGoing : styles.date}>{status === 'ongoing' ? 'Ongoing Trip' : date}</Text>
          </View>
          {status !== 'ongoing' ? (
            <View style={styles.rightStar}>
              {mockStars.map(( item, index ) => {
                return (
                  <Star key={index} color={item === true ? colors.gold : colors.historyBorder} />
                )
              })}
            </View>
          ) : null}
          <View style={[styles.rightPrice, {marginTop: status === 'ongoing' ? hp(30) : hp(10)}]}>
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: wp(335),
    height: hp(96),
    borderRadius: wp(6),
    paddingTop: hp(16),
    paddingHorizontal: hp(14.92),
    backgroundColor: colors.white,
  },
  left: {
    alignItems: 'center',
    // paddingTop
  },
  leftLine: {
    height: hp(28),
    width: wp(1),
    flexDirection: 'column',
    // borderRadius: 100,
    // overflow: 'hidden',
  },
  middle: {
    flex: 1,
    marginLeft: wp(16.92),
  },
  middleLocation: {
    fontSize: hp(14),
    fontWeight: '400',
  },
  middleDestination: {
    fontSize: hp(14),
    fontWeight: '400',
    marginTop: hp(32),
  },
  right: {
    alignItems: 'flex-end',
  },
  onGoing: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.red,
  },
  date: {
    fontSize: hp(14),
    fontWeight: '700',
    color: colors.text.black,
  },
  rightStar: {
    flexDirection: 'row',
    marginTop: hp(10),
  },
  rightPrice: {
    marginTop: hp(10),
  },
  price: {
    fontSize: hp(12),
    color: colors.text.lighterGrey,
  },
})

export default HistoryCard;
