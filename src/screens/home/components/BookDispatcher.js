import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import Input from '../../../components/Input';
import NextBtn from './NextBtn';
import { Ionicons } from '@expo/vector-icons';
import { useKeyboard } from '../../../utill/useKeyboard';

function BookDispatcher({
  onNextPress,
  yourLocation,
  onPressYourLocation,
  destination,
  onPressDestination,
  description,
  onChangeDescription }) {
    const keyboardHeight = useKeyboard();

    React.useEffect(() => {
      console.log(keyboardHeight)
    })

    const yourLocationColor = yourLocation ? colors.text.black : colors.text.black + 50;
    const destinationColor = destination ? colors.text.black : colors.text.black + 50;
  return (
    <View style={[styles.main, {bottom: Platform.select({ios: keyboardHeight, android: 0})}]}>
      <View style={styles.formContainer}>
        {/* <Input
          iconName={'location'}
          iconColor={colors.text.black}
          placeholder={'Your Location'}
          value={yourLocation}
          textColor={colors.text.black}
          width={wp(335)}
          paddingLeft={wp(17.5)}
        /> */}
        <TouchableWithoutFeedback onPress={onPressYourLocation}>
          <View style={styles.locationMain}>
            <Ionicons name={'location'} size={hp(16)} color={colors.blackBg} />
            <Text
              numberOfLines={1}
              style={[styles.locationText, { color: yourLocationColor }]}>{yourLocation ? yourLocation : 'Pick up location'}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressDestination}>
          <View style={[styles.locationMain, {marginTop: hp(8)}]}>
            <Ionicons name={'navigate'} size={hp(16)} color={colors.blackBg} />
            <Text
              numberOfLines={1}
              style={[styles.locationText, { color: destinationColor }]}
            >
              {destination ? destination : 'Destination Please?'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {/* <Input
          iconName={'navigate'}
          iconColor={colors.text.black}
          placeholder={'Destination Please?'}
          value={destination}
          textColor={colors.text.black}
          marginTop={hp(8)}
          width={wp(335)}
          paddingLeft={wp(17.5)}
        /> */}
        <Input
          iconName={'chatbox'}
          iconColor={colors.text.black}
          placeholder={'Short Description'}
          value={description}
          // onFocus={() => setSpaceBottom(Keyboard)}
          onChangeText={onChangeDescription}
          textColor={colors.text.black}
          marginTop={hp(8)}
          height={hp(84)}
          width={wp(335)}
          paddingLeft={wp(17.5)}
          multiline={true}
          numberOfLines={4}
          textAlignVertical={'top'}
          alignItems={'flex-start'}
          inputMarginTop={wp(10)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={onNextPress}>
          <NextBtn />
          {/* <Image source={require('../../../assets/next.png')} style={styles.btn} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: wp(360.5),
    height: hp(295),
    backgroundColor: colors.blackBg,
  },
  formContainer: {
    // flex: 1,
    alignItems: 'center',
    marginTop: hp(16),
  },
  locationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp(21.5),
    paddingRight: wp(16),
    width: wp(335),
    height: hp(48),
    borderRadius: wp(6),
    backgroundColor: colors.white,
  },
  locationText: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: wp(13.5),
    fontSize: hp(16),
    fontWeight: '300',
    textAlign: 'left',
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: hp(16),
  },
  btn: {
    width: wp(43),
    height: hp(43),
  },
})

export default React.memo(BookDispatcher);
