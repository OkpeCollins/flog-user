// import 'react-native-gesture-handler';
import React from 'react';
import Flog from './src/navigation';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMsg from './src/components/FlashMsg';
import AppLoading from 'expo-app-loading';
import * as Permissions from "expo-permissions";
import * as Location from 'expo-location';
import * as Notifications from "expo-notifications";
import { saveToStorage, getFromStorage } from './src/services/localStorage.service';
import { onboard } from './src/screens/onboarding/actions/onboarding.actions';
import { loadUser, userCheck } from './src/screens/login/actions/login.actions';
import { locationServiceEnabled } from './src/redux/rootAction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [appLoaded, setApploaded] = React.useState(false)
  const [onBoardedLoad, setOnboardedLoad] = React.useState(false)
  const [userLoad, setUserLoad] = React.useState(false)

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // const registerForPushNotificationsAsync = async() =>  {
  //   let token;
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== 'granted') {
  //     alert('Failed to get push token for push notification!');
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   console.log(token);

  // if (Platform.OS === 'android') {
  //   Notifications.setNotificationChannelAsync('default', {
  //     name: 'default',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }
  
  //   return token;
  // }

  // React.useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, [])
  
  React.useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then((response) => {
        if (response.status === 'granted') {
          checkLocationStatus();
        }
      })
      .catch(error => {
        console.log(error);
        checkLocationStatus();
      });
  }, []);

  const checkLocationStatus = () => {
    Location.hasServicesEnabledAsync()
      .then(response => {
        if (response === true) {
          store.dispatch(locationServiceEnabled(true))
        } else {
          store.dispatch(locationServiceEnabled(false))
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getFromStorage('onBoarded')
      .then((respone) => {
        if (respone) {
          store.dispatch(onboard());
        }
        setOnboardedLoad(true)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  React.useEffect(() => {
    getFromStorage('user')
      .then((response) => {
        if (response) {
          store.dispatch(loadUser(JSON.parse(response)));
        }
        setUserLoad(true);
      })
      .catch((error) => {
        console.log(error)
      })
  })

  React.useEffect(() => {
    if (onBoardedLoad && userLoad) {
      console.log('done')
      setApploaded(true)
    }
      // setApploaded(true)
    }, [userLoad, onBoardedLoad])

  return (
    // <GestureHandlerRootView>
    //   {
      !appLoaded ? (
        <AppLoading
        />
      ) : (
          <SafeAreaProvider>
            <Provider store={store}>
              <Flog />
              <FlashMsg />
            </Provider>
          </SafeAreaProvider>
      )
    //   }
    // </GestureHandlerRootView>
  );
}
