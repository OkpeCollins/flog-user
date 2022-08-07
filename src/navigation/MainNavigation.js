import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Feedback, FreeTrips, Home, MyProfile, NewCard, Payments, RideHistory, OngoingRideDetails, CompletedRideDetails, Support, SupportDetails, Chat, Promo, RequestLocation, PrivacyPolicy } from '../screens';
import CustomDrawer from '../components/CustomDrawer';
import { hp, wp } from '../constants/dimension';
import { StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { useSelector } from 'react-redux';

const MainNav = createDrawerNavigator();
const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const PaymentStack = createStackNavigator();
const RideHistoryStack = createStackNavigator();
const SupportStack = createStackNavigator();

//animation
const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function HomeNav() {
  return (
    <HomeStack.Navigator headerMode={'none'}>
      <HomeStack.Screen component={Home} name={'MapHome'} />
      <HomeStack.Screen component={Feedback} name={'Feedback'} />
      {/* <HomeStack.Screen component={Chat} name={'Chat'} /> */}
    </HomeStack.Navigator>
  )
}

function PaymentNav() {
  return (
    <PaymentStack.Navigator headerMode={'none'}>
      <PaymentStack.Screen component={Payments} name={'Payments'} />
      <PaymentStack.Screen component={NewCard} name={'NewCard'} />
    </PaymentStack.Navigator>
  )
}

function RideHistoryNAv() {
  return(
    <RideHistoryStack.Navigator headerMode={'none'}>
      <RideHistoryStack.Screen component={RideHistory} name={'RideHistory'} />
      <RideHistoryStack.Screen component={OngoingRideDetails} name={'OngoingRideDetails'} />
      <RideHistoryStack.Screen component={CompletedRideDetails} name={'CompletedRideDetails'} />
    </RideHistoryStack.Navigator>
  )
}

function SupportNav() {
  return(
    <SupportStack.Navigator headerMode={'none'}>
      <SupportStack.Screen component={Support} name={'Support'} />
      <SupportStack.Screen component={SupportDetails} name={'SupportDetails'} />
    </SupportStack.Navigator>
  )
}

function MainNavigator() {
  return (
    <MainNav.Navigator
      initialRouteName={'Home'}
      drawerStyle={styles.drawerStyle}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <MainNav.Screen component={HomeNav} name={'Home'} />
      <MainNav.Screen component={MyProfile} name={'MyProfile'} />
      <MainNav.Screen component={FreeTrips} name={'FreeTrips'} />
      <MainNav.Screen component={PaymentNav} name={'PaymentNav'} options={{
        unmountOnBlur: true,
      }} />
      <MainNav.Screen component={RideHistoryNAv} name={'RideHistoryNAv'} options={{
        unmountOnBlur: true,
      }} />
      <MainNav.Screen component={Promo} name={'Promo'} options={{
        unmountOnBlur: true,
      }} />
      <MainNav.Screen component={SupportNav} name={'SupportNav'} />
      <MainNav.Screen component={PrivacyPolicy} name={'PrivacyPolicy'} options={{
        unmountOnBlur: true,
      }}/>
    </MainNav.Navigator>
  )
}

function MainNavigationStack() {
  const locationServiceEnabled = useSelector(state => state.root.locationServiceEnabled);

  // if (!locationServiceEnabled) {
  //   return (
  //     <MainStack.Navigator headerMode={'none'} initialRouteName={'TabNav'}>
  //       <MainStack.Screen component={RequestLocation} name={'RequestLocation'} />
  //     </MainStack.Navigator>
  //   );
  // }

  return (
    <MainStack.Navigator
      headerMode={'none'}
    >
      {locationServiceEnabled ? (
        <>
          <MainStack.Screen component={MainNavigator} name={'MainNavigator'} />
          <MainStack.Screen component={Chat} name={'Chat'} />
        </>
      ) : (
        <MainStack.Screen component={RequestLocation} name={'RequestLocation'} />
      )}
    </MainStack.Navigator>
  )
}

const styles = StyleSheet.create({
  drawerStyle: {
    flex: 1,
    width: wp(274),
    backgroundColor: colors.blackBg,
  }
})

export default MainNavigationStack;