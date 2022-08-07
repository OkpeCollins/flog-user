import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../constants/dimension';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

function ConfirmPickup({ onPressConfirmPickup, yourLocation, destination, description, loading }) {
  return (
    <View style={styles.main}>
      <View style={styles.formContainer}>
        <Input
          iconName={'location'}
          iconColor={colors.text.black}
          placeholder={'Your Location'}
          textColor={colors.text.black}
          width={wp(335)}
          paddingLeft={wp(17.5)}
          editable={false}
          style={{
            elevation: 2,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 2
          }}
          value={yourLocation}
        />
        <Input
          iconName={'navigate'}
          iconColor={colors.text.black}
          placeholder={'Destination Please?'}
          textColor={colors.text.black}
          marginTop={hp(8)}
          width={wp(335)}
          paddingLeft={wp(17.5)}
          editable={false}
          style={{
            elevation: 2,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 2
          }}
          value={destination}
        />
        <Input
          iconName={'chatbox'}
          iconColor={colors.text.black}
          placeholder={'Short Description'}
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
          editable={false}
          style={{
            elevation: 2,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 2
          }}
          value={description}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button title={'Confirm Pickup'} onPress={onPressConfirmPickup} loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: wp(360.5),
    height: hp(720 - 90),
    elevation: 5,
  },
  formContainer: {
    // flex: 1,
    // top: hp(3),
    alignItems: 'center',
    position: 'absolute',
  },
  btnContainer: {
    // alignItems: 'center',
    top: hp(560),
    position: 'absolute',
  },
})

export default React.memo(ConfirmPickup);
