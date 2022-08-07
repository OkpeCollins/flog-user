import React from 'react';
import {View, Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const RideHistoryNav = createMaterialTopTabNavigator()

function RideHistoryTopTab() {
  return (
    <RideHistoryNav.Navigator>
      <RideHistoryNav.Screen name={OnGoingRide} />
      <RideHistoryNav.Screen name={CompletedRide} />
    </RideHistoryNav.Navigator>
  );
}

export default RideHistoryTopTab;
