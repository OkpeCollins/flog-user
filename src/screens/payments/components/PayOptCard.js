import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { naira } from '../../../constants/staticData';
import Cash from './Cash';
import Mastercard from './Mastercard';
import Verve from './Verve';
import Visa from './Visa';

function PayOptCard({ type, addCard, title, marginTop, option = false, optColor, onPress, price, titleSize = wp(14), width = wp(311), paymentStatus, disabled}) {
  // let Component;
  // switch (type) {
  //   case 'visa':
  //       componet = Visa;
  //     break;
  
  //   default:

  //     break;
  // }
  return (
    <TouchableOpacity style={{ marginTop }} onPress={onPress} disabled={disabled}>
      <View style={[styles.main, {width}]}>
        <View style={styles.icon}>
          {type === 'VISA' ? (
            <Visa />
          ) : type === 'Cash' ? (
            <Cash />
          ) : type === 'MASTERCARD' ? <Mastercard /> : type === 'VERVE' ? <Verve /> : (<Ionicons name={'add-circle'} size={hp(20)} color={colors.blue} />)}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, {fontSize: titleSize}]}>{type === 'MASTERCARD' || type === 'VISA' || type === 'VERVE' ?  `**** **** **** ${title}` : title }</Text>
        </View>
        {option ? (
          <View style={styles.mark}>
            <Ionicons name={'checkmark-circle'} color={optColor} size={hp(18)} />
          </View>
        ) : addCard ? null : (
          <>
            <Text style={styles.price}>{naira}{price}</Text>
            <Text style={styles.price}> - </Text>
            <Text style={[styles.paymentStatus, { color: paymentStatus === 'Not Paid' ? 'red' : 'green' }]}>{paymentStatus}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp(56),
    borderRadius: wp(10),
    backgroundColor: colors.white,
    paddingRight: wp(20),
    paddingLeft: wp(8)
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.payLogoBg,
    width: wp(40),
    height: wp(40),
    borderRadius: wp(8),
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(16),
  },
  text: {
    fontSize: wp(14),
    fontWeight: '700',
  },
  mark: {

  },
  price: {
    fontSize: hp(16),
    fontWeight: '700',
  },
})

export default PayOptCard;
