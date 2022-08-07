import React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert, BackHandler, FlatList, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet from 'reanimated-bottom-sheet';
import * as Location from 'expo-location';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import { hp, wp } from '../../constants/dimension';
import { mapStyles } from '../../constants/mapStyle';
import BookDispatcher from './components/BookDispatcher';
import ConfirmPickup from './components/ComfirmPickup';
import DriverDetails from './components/DriverDetails';
import { Marker } from 'react-native-maps';
import { apiBaseUrl, demoLocation, user } from '../../constants/staticData';
import LocationModal from './components/LocationModal';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Input from '../../components/Input';
import ContentHeader from '../../components/ContentHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { showFlashMsg } from '../../redux/rootAction';
import { cancelTrip, createTrip, destinationDetails, driverAccepted, driverFoundId, getAutoCompletData, getGeometry, getLocationWithCoords, getPolyline, loading, locationDetails, packageDescription, stopLoading, tripCanceledByUser, tripStarted } from './actions/home.action';
import { notificationService } from '../../services/notification.service';
import AutoCompleteListView from '../../components/AutoCompleteList';
import { setRiderId, setTripId } from '../chat/actions/chat.action';
import { socket } from '../../services/realTime.service';
import { userCheck } from '../login/actions/login.actions';
import useInterval from '../../constants/useInterval';
// import InrideBottomSheet from './components/InrideBottomSheet';


function Home({ navigation }) {
  const [toBook, setTobook] = React.useState(true);
  const [rideBooked, setRideBooked] = React.useState(false);
  const [cancelIcon, setCancelIcon] = React.useState(true);
  const [locationInputValue, setLocationInputValue] = React.useState(null)

  const [initialLocation, setInitialLocation] = React.useState({latitude: 6.465422, longitude: 3.406448, latitudeDelta: 0.0922, longitudeDelta: 0.009,});
  const [location, setLocation] = React.useState({coords: {}});
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [locationInputType, setLocationInputType] = React.useState(null);
  // const [loading, setLoading] = React.useState(false);
  const [destination, setDestination] = React.useState(null);

  const [useIntervalDelay, setUseIntervalDelay] = React.useState(null);
  const [useIntervalTrip, setUseIntervalTrip] = React.useState(null);

  const dispatch = useDispatch();
  
  const state = useSelector(state => state.home);
  const loginState = useSelector(state => state.login);
  const locationServiceEnabled = useSelector(state => state.root.locationServiceEnabled);
  
  const mapRef = React.useRef(null);
  const sheetRef = React.useRef();
  const inputLocationRef = React.useRef();
  const autoCompleteRef = React.useRef();

  // const socket = React.useMemo(() => io(apiBaseUrl), []);

  React.useEffect(() => {
    let locationTimeout;

    if (locationServiceEnabled) {
      locationTimeout = setTimeout(() => getLocation(), 3000)
    }

    const getLocation = () => {
      Location.getCurrentPositionAsync()
        .then((response) => {
          let location = {
            latitude: response.coords.latitude,
            longitude: response.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.009,
          }
          setLocation(response);
            mapRef.current.animateToRegion(location, 1500)
            dispatch(getLocationWithCoords(response.coords.latitude, response.coords.longitude));
        })
        .catch(error => {
          dispatch(showFlashMsg('Unable to get your location automatically, you will have to input manually'))
      })
      .finally( () => {
        clearTimeout(locationTimeout);
      })
    }

    // (async () => {
    //   await Location.getCurrentPositionAsync()
    //     .then((response) => {
    //       let location = {
    //         latitude: response.coords.latitude,
    //         longitude: response.coords.longitude,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.009,
    //       }
    //       setLocation(response)
    //       mapRef.current.animateCamera({
    //         center: { latitude: location.latitude, longitude: location.longitude },
    //         zoom: 15,
    //         heading: 20,
    //         pitch: 2,
    //         altitude: 1000,
    //         }, 25000)
    //       // mapRef.current.animateToCoordinate({latitude: location.latitude, longitude: location.longitude})
    //       dispatch(getLocationWithCoords(response.coords.latitude, response.coords.longitude));
    //     })
    //     .catch(error => {
    //       dispatch(showFlashMsg('Unable to get your location automatically, you will have to input manually'))
    //   })
    // })();
  }, []);

  React.useEffect(() => {
    let data = {
      userId: loginState.user.id
    }
    dispatch(userCheck(data))
  }, [])

  React.useEffect(() => {
    socket.emit('notificationSubscribe', loginState.user.notificationToken);
  }, [])

  React.useEffect(() => {
    const backAction = () => {
      if (rideBooked) {
        setRideBooked(false);
        setTobook(true);
      } else {
        BackHandler.exitApp()
      }
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [rideBooked]);

  React.useEffect(() => {
    if (state.tripBooked) {
      dispatch(showFlashMsg('Finding Driver for you, please hold on'));
      console.log('finding driver............................')
      socket.emit('findDriver', state.tripData.tripData);
    }
  }, [state.triggerFindDriver])

  React.useEffect(() => {
    if (state.triggerToBook !== null) {
      setRideBooked(false)
      setTobook(true)
    }
  }, [state.triggerToBook])

  useInterval(() => {
    noResponseFunc(useIntervalTrip);
  }, useIntervalDelay)

  console.log('rendering......................................')

  React.useEffect(() => {
    socket.on('chatNotification', (data) => {
      // dispatch(showFlashMsg('You just recieved a message from your rider'));
      notificationService.sendNotificationImmediately(`${data.userName}`, data.msg[0].text);
    })
  
    socket.on('notifyDriver', (data) => {
      dispatch(showFlashMsg(`Rider Found waiting for driver's response`));
      console.log(data);
      dispatch(driverFoundId(data.riderId));
      setUseIntervalDelay(22000);
      setUseIntervalTrip(data);
    })

    socket.on('noResponseFromDriver', (data) => {
      setUseIntervalDelay(null)
      console.log('......................................')
      dispatch(showFlashMsg('Please hold on a for a bit'));
      socket.emit('findDriver', data);
    })
  
    socket.on('tripAccepted', (data) => {
      setUseIntervalDelay(null)
      dispatch(showFlashMsg('Your rider is on his way'))
      notificationService.sendNotificationImmediately('Driver Found', `Driver has been found, please hold on for the driver's response`)
      dispatch(driverAccepted(data))
      dispatch(stopLoading())
      setRideBooked(false);
    })
    
    socket.on('startTrip', (data) => {
      dispatch(showFlashMsg(`Your rider is on it's way to make your delivery`))
      notificationService.sendNotificationImmediately(`Your Package is on it's way`, `Your rider is on it's way to deliver your package`)
      dispatch(tripStarted(data))
    })
  
    socket.on('cancelTrip', () => {
      setUseIntervalDelay(null)
      dispatch(showFlashMsg('Trip canelled'))
      dispatch(tripCanceledByUser())
      setTobook(true);
    })
  
    socket.on('cancelTripWhenPending', (data) => {
      setUseIntervalDelay(null)
      dispatch(showFlashMsg('You have cancelled your trip request'))
      dispatch(tripCanceledByUser())
      setTobook(true);
    })
  
    socket.on('cancelTripWhenPendingError', (data) => {
      dispatch(showFlashMsg('Error cancelling your trip request, try again'))
      // navigation.goBack();
    })
  
    socket.on('deliverTrip', () => {
      dispatch(showFlashMsg('Hey, your package has been delivered successfully'))
      dispatch(tripComplated())
      setTobook(true);
    })
  
    socket.on('riderReject', (data) => {
      setUseIntervalDelay(null)
      dispatch(showFlashMsg('Please hold on a for a bit'));
      socket.emit('findDriver', data);
    })
  
    socket.on('noDriver', (data) => {
      setUseIntervalDelay(null)
      dispatch(tripCanceledByUser());
      setRideBooked(false)
      setTobook(true);
      dispatch(showFlashMsg('Sorry no rider available at the moment, please try again later'));
    })
  
    socket.on('deliverTrip', (data) => {
      dispatch(showFlashMsg('You package has been delivered successfully'));
    })
  }, [])

  // const handleTimeout = () => {
  //   dispatch(showFlashMsg('Something went wrong please try again'));
  //   dispatch(tripCanceledByUser());
  //   clearTimeout(hideFlashMsgTimeout);
  // }

  const noResponseFunc = (tripData) => {
    console.log(tripData)
    if (tripData.trip.excludesRiders !== undefined) {
      console.log('shit................')
      let data = [...tripData.trip.excludesRiders, tripData.riderId];
      socket.emit('noResponseFromDriver', { ...tripData.trip, data })
    } else {
      console.log('hmmmmm................')
      let excludesRiders = [tripData.riderId];
      socket.emit('noResponseFromDriver', { ...tripData.trip, excludesRiders: excludesRiders })
    }
  }

  // const noResponseFromDriver = React.useCallback((trip) => {
  //   // console.log(state.tripData.tripData.excludesRiders)
  //   useInterval(() => {
  //     noResponseFunc(trip);
  //   }, useIntervalDelay)
  //   // let noResponseTimeOut = setInterval(() => {
      
  //   // }, 10000);
  // }, [useIntervalDelay])

  const handleAutoCompleteCall = (text) => {
    if (text.length >= 3) {
      dispatch(getAutoCompletData({address: text}))
    }
  }

  const handleLocationSet = (data) => {
    // setDescription(data.description);
    dispatch(getGeometry({placeId: data.place_id, locationInputType}))
    setLocationInputValue(null);
    inputLocationRef.current.snapTo(0);
  }

  const InrideBottomSheet = () => {
    return (
      <View style={inrideBottomSheetStyles.main}>
        <View style={inrideBottomSheetStyles.sheetContainer}>
          <View style={inrideBottomSheetStyles.dragger} />
          <View style={inrideBottomSheetStyles.btnContainer}>
            <Button
              title={'Driving to your destination'}
            />
          </View>
          <View style={inrideBottomSheetStyles.newTripContainer}>
            <View style={inrideBottomSheetStyles.newTripQus}>
              <Text style={inrideBottomSheetStyles.newTripTitle}>New Trip?</Text>
              <Text style={inrideBottomSheetStyles.newTripDesc}>Do you want to order another ride?</Text>
            </View>
            <View style={inrideBottomSheetStyles.newTripBtn}>
              <Button
                title={'Yes'}
                width={wp(98)}
                height={hp(47)}
                borderRadius={hp(34)}
                onPress={() => handleReset()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  const InputLocationHeader = () => {
    return (
      <View style={ inputLocationStyles.draggerHeader}>
        <View style={inputLocationStyles.dragger} />
      </View>
    );
  }

  const InputLocation = () => {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={inputLocationStyles.main}>
          <Text style={inputLocationStyles.contentHeader}>Input Location</Text>
          {/* <ContentHeader title={'Input Location'} height={hp(48)} /> */}
          <View style={inputLocationStyles.locationSearch}>
            <Input
              placeholder={'Search'}
              width={wp(335)}
              value={locationInputValue}
              onChangeText={(text) => handleAutoCompleteCall(text)}
            />
          </View>
          <View style={inputLocationStyles.autoCompleteContainer}>
            <FlatList
              data={state.autoCompleteData}
              style={inputLocationStyles.data}
              keyboardShouldPersistTaps={'handled'}
              keyExtractor={(item) => item.place_id}
              // ItemSeparatorComponent={SupportOptSeperator}
              renderItem={({ item }) => (
                <AutoCompleteListView key={`location-${item.place_id}`} title={item.description} onPress={() => handleLocationSet(item)} />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const handleOnPressLocationInput = (type) => {
    switch (type) {
      case 'yourLocation':
        setLocationInputType('yourLocation')
        break;
      case 'destination':
        setLocationInputType('destination')
        break;
      default:
        setLocationInputType(null)
        break;
    }
    console.log(locationInputType);
    inputLocationRef.current.snapTo(1)
  }

  const handleTripBook = () => {
    if (state.locationDetails.description && state.destinationDetails.description && state.packageDescription) {
      let data = {
        authorization: `bearer ${loginState.user.tokens.accessToken}`,
        coords: {
          originLatitude: state.locationDetails.latitude,
          originLongitude: state.locationDetails.longitude,
          destinationLatitude: state.destinationDetails.latitude,
          destinationLongitude: state.destinationDetails.longitude,
        }
      }
      console.log(data);
      dispatch(getPolyline(data))

      setTobook(false);
      setRideBooked(true);
    } else {
      dispatch(showFlashMsg(`You location, destination and description can't be empty`))
    }
  }

  const handleLocationSelect = (data) => {
    switch (locationInputType) {
      case 'yourLocation':
        dispatch(locationDetails(data))
        break;
      case 'destination':
        dispatch(destinationDetails(data))
        break;
      default:
        break;
    }
    inputLocationRef.current.snapTo(0);
    autoCompleteRef.current.clear();
  }

  const handleCreateTrip = () => {
    dispatch(loading())
    let data = {
      authorization: `bearer ${loginState.user.tokens.accessToken}`,
      details: {
        userId: loginState.user.id,
        description: state.packageDescription,
        originLatitude: state.locationDetails.latitude,
        originLongitude: state.locationDetails.longitude,
        destinationLatitude: state.destinationDetails.latitude,
        destinationLongitude: state.destinationDetails.longitude,
      }
    }
    console.log(data);
    dispatch(createTrip(data));
    // setRideBooked(false);
    // setPickupConfirmed(true)
  }

  const handleCancelTrip = () => {
    dispatch(cancelTrip());
    socket.emit('cancelTripWhenPending', state.acceptedTripData.tripData.id);
  }

  const handleChatPress = () => {
    dispatch(setTripId(state.acceptedTripData.tripData.id));
    dispatch(setRiderId(state.acceptedTripData.RiderId));
    navigation.navigate('Chat');
  }

  const handleReset = () => {
    // dispatch()
    dispatch(tripCanceledByUser())
    setTobook(true);
  }

  return (
    <View style={styles.main}>
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        // customMapStyle={mapStyles}
        // initialRegion={initialLocation}
      >
        {location.coords.latitude && !rideBooked && <Marker
          coordinate={{
            latitude: location.coords.latitude ? location.coords.latitude : 0,
            longitude: location.coords.longitude ? location.coords.longitude: 0,
          }}
          image={require('../../asset/customMarker.png')}
        />}
        {rideBooked && state.polylineData && (
          <>
          {/* {mapRef.current.fitToCoordinates([
              state.polylineData[0],
              state.polylineData[state.polylineData.length - 1],
            ], {
              edgePadding: {
                top: hp(180),
                right: 25,
                left: 25,
                bottom: hp(50),
              },
            })} */}
            <Polyline
              coordinates={state.polylineData}
              strokeColor={colors.mapPolyLine}
              strokeWidth={2}
            />
            <Marker
              coordinate={state.polylineData[0]}
              image={require('../../asset/origin.png')}
            />
            <Marker
              coordinate={state.polylineData[state.polylineData.length - 1]}
              image={require('../../asset/destination.png')}
            />
          </>
        )}
      </MapView>
      <Header
        lightMode={true}
        middleComponent={{ title: 'FLOG', color: colors.text.black }}
        leftComponent={{ iconName: 'menu', color: colors.text.black, onpress: () => navigation.openDrawer() }}
      />
      {toBook && <BookDispatcher
        onNextPress={() => handleTripBook()}
        onPressYourLocation={() => handleOnPressLocationInput('yourLocation') }
        onPressDestination={() => handleOnPressLocationInput('destination') }
        yourLocation={state.locationDetails.description}
        destination={state.destinationDetails.description}
        onChangeDescription={(text) => dispatch(packageDescription(text))}
        description={state.packageDescription}
      />}
      {rideBooked && <ConfirmPickup
        onPressConfirmPickup={() => { handleCreateTrip(); }}
        yourLocation={state.locationDetails.description}
        destination={state.destinationDetails.description}
        description={state.packageDescription}
        loading={state.loading}
      />}
      {state.driverAccepted &&
        <DriverDetails
          onChatPress={() => handleChatPress()}
          name={state.acceptedTripData.riderData.name}
          tripsCompleted={state.acceptedTripData.riderData.RiderTrips}
          distance={state.acceptedTripData.tripData.distance.text}
          paymentType={state.acceptedTripData.tripData.paymentType}
          eta={state.acceptedTripData.tripData.ETA.text}
          price={state.acceptedTripData.tripData.price}
          phoneNum={state.acceptedTripData.riderData.mobile}
          mimeType={state.acceptedTripData.riderData.profilePicture ? state.acceptedTripData.riderData.profilePicture.mimeType : null}
          imageValue={state.acceptedTripData.riderData.profilePicture ? state.acceptedTripData.riderData.profilePicture.value : null}
          onPressCancel={() => handleCancelTrip()}
          loading={state.loading}
        />}
      {state.tripStarted && (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[hp(178), hp(270)]}
          renderContent={InrideBottomSheet}
          onOpenEnd={() => setCancelIcon(true)}
          enabledContentTapInteraction={false}
        />
      )}
      {Platform.OS === 'ios' && (
          <BottomSheet
            ref={inputLocationRef}
            snapPoints={[hp(0), hp(675) + StatusBar.currentHeight]}
            overdragResistanceFactor={10}
            renderContent={InputLocation}
            renderHeader={InputLocationHeader}
            enabledContentTapInteraction={false}
          />
      )}
      {Platform.OS === 'android' && (
        <View style={{width: wp(360) ,height: hp(720)}}>
          <BottomSheet
            ref={inputLocationRef}
            snapPoints={[hp(0), hp(675) + StatusBar.currentHeight]}
            overdragResistanceFactor={10}
            renderContent={InputLocation}
            renderHeader={InputLocationHeader}
            enabledContentTapInteraction={false}
          />
        </View>
      )}
      {/* <View style={{width: wp(360) ,height: hp(720)}}> */}
        {/* <BottomSheet
          ref={inputLocationRef}
          snapPoints={[hp(0), hp(675) + StatusBar.currentHeight]}
          overdragResistanceFactor={10}
          renderContent={InputLocation}
          renderHeader={InputLocationHeader}
          enabledContentTapInteraction={false}
        /> */}
      {/* </View> */}
      {/* {locationInput ? <LocationModal /> : null} */}
    </View>
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
})

const inrideBottomSheetStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: wp(360),
  },
  sheetContainer: {
    // flex: 1,
    alignItems: 'center',
    height: hp(270),
    width: wp(360),
    paddingHorizontal: wp(20),
    borderTopLeftRadius: wp(34),
    borderTopRightRadius: wp(34),
    backgroundColor: colors.blackBg,
  },
  dragger: {
    marginTop: hp(9),
    width: wp(113),
    height: hp(8),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  btnContainer: {
    marginTop: hp(97),
  },
  newTripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(26),
    paddingBottom: hp(15.5),
    borderBottomWidth: hp(1),
    borderBottomColor: colors.grey + 33,
  },
  newTripQus: {
    flex: 1,
  },
  newTripTitle: {
    fontSize: hp(22),
    fontWeight: '700',
    color: colors.white,
  },
  newTripDesc: {
    fontSize: hp(12),
    fontWeight: '500',
    marginTop: hp(4),
    color: colors.grey,
  },
  newTripBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

const inputLocationStyles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    height: hp(675),
    width: wp(360),
    paddingHorizontal: wp(20),
    backgroundColor: colors.blackBg,
  },
  draggerHeader: {
    width: wp(360),
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    borderTopLeftRadius: wp(15),
    borderTopRightRadius: wp(15),
    backgroundColor: colors.blackBg
  },
  dragger: {
    marginTop: hp(9),
    width: wp(50),
    height: hp(6),
    borderRadius: hp(8) / 2,
    backgroundColor: colors.grey,
  },
  contentHeader: {
    fontSize: hp(16),
    fontWeight: '700',
    textAlign: 'center',
    color: colors.text.white,
    marginTop: hp(30),
  },
  locationSearch: {
    // flex: 1,
    alignItems: 'center',
    width: wp(335),
    marginTop: hp(16),
  },
  data: {
    width: wp(360),
  },
  autoCompleteContainer: {
    // height: hp(380),
    width: hp(360),
  },
})

export default Home;
