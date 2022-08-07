import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, ActivityIndicator } from 'react-native';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import { Ionicons } from '@expo/vector-icons';
import Star from '../../../components/Star';
import { mockStars } from '../../../constants/testData';
import { naira } from '../../../constants/staticData';

function DriverDetails({
  onNextPress,
  onChatPress,
  name,
  loading = false,
  tripsCompleted,
  distance,
  price,
  eta,
  paymentType,
  phoneNum,
  onPressCancel,
  status,
  mimeType,
  imageValue
}) {

  console.log(loading);

  const onPressCall = () => {
    Linking.openURL(`tel:${phoneNum}`);
  }
  return (
    <View style={styles.main}>
      <View style={styles.driverDetailsTop}>
        <View style={styles.imageContainer}>
          <View style={styles.imagebase}>
            <Image source={{uri:`data:${mimeType};base64,${imageValue}`}} style={styles.userImage} />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.trips}>{tripsCompleted} trips completed</Text>
          <View style={styles.rightStar}>
            {mockStars.map(( item, index ) => {
              return (
                <Star key={index} color={item === true ? colors.gold : colors.historyBorder} />
              )
            })}
          </View>
        </View>
        <View style={styles.callBtnContainer}>
          <Button width={wp(111)} height={hp(38)} title={'Call Driver'} onPress={() => onPressCall()} />
        </View>
      </View>
      <View style={styles.driverDetailsMiddle}>
        <TouchableOpacity onPress={onChatPress}>
          <View style={styles.option}>
            <Ionicons name={'chatbubble-ellipses'} size={hp(18)} color={colors.mainColor} />
            <Text style={styles.optionText}>Chat</Text>
          </View>
        </TouchableOpacity>
        {status !== 'Ongoing' ? (
          <TouchableOpacity onPress={onPressCancel}>
            <View style={styles.option}>
              <Ionicons name={'close-sharp'} size={hp(18)} color={colors.mainColor} />
              {loading ? (
                <ActivityIndicator size={'small'} color={colors.text.white} />
                ) : (
                <Text style={styles.optionText}>Cancel</Text>
              )}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.driverDetailsBottom}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Distance</Text>
          <Text style={styles.tripInfoData}>{distance}</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Price</Text>
          <Text style={styles.tripInfoData}>{naira}{price}</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>ETA</Text>
          <Text style={styles.tripInfoData}>{eta}</Text>
        </View>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoTitle}>Payment</Text>
          <Text style={styles.tripInfoData}>{paymentType}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: 'center',
    position: 'absolute',
    bottom: hp(10),
    width: wp(335),
    height: hp(200),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    backgroundColor: colors.blackBg,
    borderRadius: hp(6)
  },
  driverDetailsTop: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(19),
    paddingBottom: hp(12),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  imageContainer: {
    height: hp(52),
    width: wp(52),
  },
  imagebase: {
    height: hp(52),
    width: wp(52),
    backgroundColor: '#e2e2e2',
    borderRadius: wp(52) / 2,
    overflow: 'hidden',
  },
  userImage: {
    width: wp(52),
    height: wp(52),
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(10)
  },
  name: {
    marginRight: wp(5),
    fontSize: hp(14),
    color: colors.text.white,
  },
  trips: {
    fontSize: hp(9),
    color: colors.mainColor,
  },
  rightStar: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  callBtnContainer: {
    flex: 1,
  },
  driverDetailsMiddle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(16),
    paddingBottom: hp(13),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: hp(14),
    fontWeight: '500',
    color: colors.text.white,
    marginLeft: wp(8),
  },
  driverDetailsBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(15),
    // paddingBottom: hp(13),
  },
  tripInfo: {
    // flex: 1,
  },
  tripInfoTitle: {
    fontSize: hp(12),
    fontWeight: '400',
    color: colors.text.grey,
  },
  tripInfoData: {
    fontSize: hp(14),
    fontWeight: '500',
    marginTop: hp(3),
    color: colors.text.white,
  },
})

export default React.memo(DriverDetails);
