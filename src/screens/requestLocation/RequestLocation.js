import React from 'react';
import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import Button from '../../components/Button';
import * as Linking from 'expo-linking';
import { locationServiceEnabled, showFlashMsg } from '../../redux/rootAction';
import {startActivityAsync , ActivityAction} from 'expo-intent-launcher';

function RequestLocation() {
  const [permissionStatus, setPermissionStatus] = React.useState(false);
  const state = useSelector(state => state.root);

  const dispatch = useDispatch();
  
  React.useEffect(() => {
    Location.requestForegroundPermissionsAsync()
    .then((response) => {
      if (response.status === 'granted') {
        setPermissionStatus(true)
        checkLocationStatus();
      } else {
        setPermissionStatus(false)
      };
    })
  });

  const checkLocationStatus = () => {
    Location.hasServicesEnabledAsync()
      .then(response => {
        console.log();
        if (response && permissionStatus) {
          dispatch(locationServiceEnabled(true));
        } else {
          dispatch(locationServiceEnabled(false));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const onPressOnLocation = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings:');
    } else {
      startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
    }
  }

  return (
    <View style={styles.main}>
      {/* <Header
        backgroundColor={colors.blackBg}
        middleComponent={{ title: 'Settings', color: colors.text.white }}
      /> */}
      <View style={styles.container}>
        <Ionicons name={'location'} size={wp(200)} color={colors.mainColor} />
        <Text style={styles.Title}>
          Please Enable Location Service
        </Text>
        <Text style={styles.info}>
          Location service is required to provide you with the best experience, please enable to continue.
        </Text>
        <View style={styles.buttonContainer}>
          <Button title={'Turn on location'} onPress={() => onPressOnLocation()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: hp(720) + StatusBar.currentHeight,
    width: wp(360),
    backgroundColor: colors.blackBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // marginTop: hp(100),
    marginHorizontal: wp(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    marginTop: hp(100),
    fontSize: wp(16),
    fontWeight: '700',
    color: colors.mainColor,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  info: {
    marginTop: hp(10),
    fontSize: wp(14),
    fontWeight: '400',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  buttonContainer: {
    marginTop: hp(50)
  },
})

export default RequestLocation;
