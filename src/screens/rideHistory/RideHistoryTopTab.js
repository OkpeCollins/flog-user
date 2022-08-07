import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import OnGoingRides from './OngoingRides';
import CompletedRides from './CompletedRides';
import { hp, wp } from '../../constants/dimension';
import { colors } from '../../constants/colors';
import OngoingRideDetails from './OngoingRideDetails';

const RideHistoryNav = createMaterialTopTabNavigator()
const OngoingRideStack = createStackNavigator();

// function OngoingRideNav() {
//   return (
//     <OngoingRideStack.Navigator headerMode={'none'}>
//       <OngoingRideStack.Screen component={OnGoingRides} name={'OngoinRides'} />
//       <OngoingRideStack.Screen component={OngoingRideDetails} name={'OngoingRideDetails'} />
//     </OngoingRideStack.Navigator>
//   )
// }

function RideHistoryTopTab() {
  return (
    <RideHistoryNav.Navigator 
      tabBarOptions={{
        labelStyle:{fontSize: hp(14), fontWeight: '500', textTransform: 'capitalize'},
        style:{backgroundColor: colors.blackBg,},
        activeTintColor: colors.text.white,
        scrollEnabled: true,
        tabStyle: {width: wp(360) / 2},
        indicatorStyle: {backgroundColor: colors.mainColor, height: hp(4)},
      }}
    >
      <RideHistoryNav.Screen component={OnGoingRides} name={'OnGoingRidesTab'} options={{tabBarLabel:'Ongoing'}}  />
      <RideHistoryNav.Screen component={CompletedRides} name={'CompletedRides'} options={{tabBarLabel:'Completed'}}  />
    </RideHistoryNav.Navigator>
  );
}

const styles = StyleSheet.create({
  labelStyle:{
    fontSize: hp(14),
    fontWeight: '500',
  },
  tab: {
    backgroundColor: colors.blackBg,
  }
}) 

export default RideHistoryTopTab;
