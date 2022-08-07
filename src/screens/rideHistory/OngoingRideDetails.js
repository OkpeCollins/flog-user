import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableNativeFeedback, ActivityIndicator, BackHandler } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { mapStyles } from '../../constants/mapStyle';
import { apiBaseUrl } from '../../constants/staticData';
import { showFlashMsg } from '../../redux/rootAction';
import { setRiderId, setTripId } from '../chat/actions/chat.action';
import { getPolyline } from '../home/actions/home.action';
import DriverDetails from '../home/components/DriverDetails';
import { triggerHistoryGet } from './actions/rideHistory.action';
import HistoryCard from './components/HistoryCard';

function OngoingRideDetails({ navigation }) {
  const [pendingCancelLoading, setPendingCancelLoading] = React.useState(false);

  const user = useSelector(state => state.login.user);
  const polylineData = useSelector(state => state.home.polylineData);
  const singleOtherHistory = useSelector(state => state.rideHistory.singleOtherHistory);
  
  const dispatch = useDispatch();

  const socket = React.useMemo(() => io(apiBaseUrl));

  console.log(singleOtherHistory);

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.009;

  const mapRef = React.useRef();

  React.useEffect(() => {
    const backAction = () => {
      navigation.goBack()
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    let data = {
      authorization: `bearer ${user.tokens.accessToken}`,
      coords: {
        originLatitude: singleOtherHistory.origin.latitude,
        originLongitude: singleOtherHistory.origin.longitude,
        destinationLatitude: singleOtherHistory.destination.latitude,
        destinationLongitude: singleOtherHistory.destination.longitude,
      }
    }
    dispatch(getPolyline(data))
  }, [])

  React.useEffect(() => {
    // mapRef.current.animateCamera({
    //   center: { latitude: parseFloat(singleOtherHistory.destination.latitude), longitude: parseFloat(singleOtherHistory.destination.longitude) },
    //   zoom: 11,
    //   heading: 20,
    //   pitch: 5,
    //   altitude: 10000,
    //   }, 60000)
    if (polylineData) {
      let markers = [
        polylineData[0],
        polylineData[polylineData.length - 1],
      ]
        mapRef.current.fitToCoordinates(markers, {
          edgePadding: {
            top: hp(80),
            right: 25,
            left: 25,
            bottom: hp(100),
          },
        })
    }
  }, [polylineData])

  const handleCompleteTrip = (tripId) => {
    socket.emit('deliverTrip', tripId)
  }

  const handleCancelTrip = (status) => {
    if (status !== 'Accepted') {
      dispatch(showFlashMsg(`Sorry, you can only cancel if trip status is Accepted`))
    }
  }

  const handlePendingCancelTrip = () => {
    setPendingCancelLoading(true)
    socket.emit('cancelTripWhenPending', singleOtherHistory.id)
  }

  const handleChatPress = () => {
    dispatch(setTripId(singleOtherHistory.id));
    dispatch(setRiderId(singleOtherHistory.riderData.id))
    navigation.navigate('Chat');
  }

  socket.on('cancelTripWhenPending', (data) => {
    dispatch(triggerHistoryGet())
    dispatch(showFlashMsg('You have cancelled your trip request'))
    setPendingCancelLoading(false)
    navigation.goBack();
  })

  socket.on('cancelTripWhenPendingError', (data) => {
    dispatch(triggerHistoryGet())
    dispatch(showFlashMsg('Error cancelling your trip request'))
    setPendingCancelLoading(false)
    // navigation.goBack();
  })

  return (
    <SafeAreaView style={styles.main}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
      {polylineData && (
        <>
          <Polyline
            coordinates={polylineData}
            strokeColor={colors.mapPolyLine}
            strokeWidth={2}
          />
          <Marker
            coordinate={polylineData[0]}
            image={require('../../asset/origin.png')}
          />
          <Marker
            coordinate={polylineData[polylineData.length - 1]}
            image={require('../../asset/destination.png')}
          />
        </>
      )}
      </MapView>
      <Header lightMode middleComponent={{ title: 'Ride History', color: colors.text.black }}
        leftComponent={{ iconName: 'arrow-back', color: colors.text.black, onpress: () => navigation.goBack() }}
      />
      <HistoryCard
        location={singleOtherHistory.origin.text}
        destination={singleOtherHistory.destination.text}
        status={singleOtherHistory.status}
        price={singleOtherHistory.price}
        date={singleOtherHistory.createdAt}
      />
      {singleOtherHistory.status !== 'Pending' && singleOtherHistory.status !== 'Cancelled' &&
        <DriverDetails
          onChatPress={() => handleChatPress()}
          name={singleOtherHistory.riderData && singleOtherHistory.riderData.name}
          tripsCompleted={singleOtherHistory.riderData && singleOtherHistory.riderData.RiderTrips}
          phoneNum={singleOtherHistory.riderData && singleOtherHistory.riderData.mobile}
          distance={singleOtherHistory.distance.text}
          paymentType={singleOtherHistory.paymentType}
          eta={singleOtherHistory.ETA.text}
          price={singleOtherHistory.price}
          status={singleOtherHistory.status}
          onPressCancel={() => handleCancelTrip(singleOtherHistory.status)}
          // loading={state.loading}
      />}
      
      {singleOtherHistory.status === 'Pending' && (
        <View style={styles.cancelTrip}>
          <TouchableNativeFeedback onPress={() => handlePendingCancelTrip()}>
            <View style={styles.cancelTripBtn}>
              {pendingCancelLoading ? (
                <ActivityIndicator size={'large'} color={colors.text.white} />
              ) : (
                <Text style={styles.cancelTripText}>Cancel Trip</Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: wp(360),
    height: hp(720),
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFill,
  },
  cancelTrip: {
    position: 'absolute',
    bottom: 50,
  },
  cancelTripBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(335),
    height: hp(48),
    backgroundColor: colors.red,
    borderRadius: wp(5)
  },
  cancelTripText: {
    fontSize: hp(16),
    color: colors.text.white,
    fontWeight: '700',
  },
})

export default OngoingRideDetails;
