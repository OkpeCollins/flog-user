import { showFlashMsg } from "../../../redux/rootAction"
import { locationService } from "../../../services/location.service"
import { tripService } from "../../../services/trip.service"
import { triggerHistoryGet } from "../../rideHistory/actions/rideHistory.action"
import polyline from '@mapbox/polyline';

import {
  GET_LOCATION_DETAILS_SUCCESS,
  GET_LOCATION_DETAILS_FAILED,
  LOCATION_DETAILS,
  DESTINATION_DETAILS,
  PACKAGE_DESCRIPTION,
  LOADING,
  TRIP_CREATED,
  TRIP_CREATION_UNSUCCESSFULL,
  DRIVER_ACCEPTED,
  TRIP_STARTED,
  TRIP_CANCELLED,
  CANCEL_TRIP,
  TRIP_COMPLETED,
  FIND_DRIVER_ERROR,
  AUTO_COMPLETE_DATA,
  GET_GEOMETRY,
  STOP_LOADING,
  RESET_HOME_STATE,
  DRIVER_FOUND,
  POLYLINE,
} from './home.type'

export const loading = () => {
  return {
    type: LOADING,
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  }
}

export const getLocationSuccessful = (data) => {
  return {
    type: GET_LOCATION_DETAILS_SUCCESS,
    payload: data,
  }
}

export const locationDetails = (data) => {
  return {
    type: LOCATION_DETAILS,
    payload: data,
  }
}

export const destinationDetails = (data) => {
  return {
    type: DESTINATION_DETAILS,
    payload: data,
  }
}

export const getLocationWithCoordsFailed = (data) => {
  return {
    type: GET_LOCATION_DETAILS_FAILED,
    payload: data,
  }
}

export const packageDescription = (data) => {
  return {
    type: PACKAGE_DESCRIPTION,
    payload: data,
  }
}

export const tripCreationSuccessful = (data) => {
  return {
    type: TRIP_CREATED,
    payload: data,
  }
}

export const tripCreationUnsuccessful = (data) => {
  return {
    type: TRIP_CREATION_UNSUCCESSFULL,
    payload: data,
  }
}

export const driverFoundId = (data) => {
  return {
    type: DRIVER_FOUND,
    payload: data,
  }
}

export const driverAccepted = (data) => {
  return {
    type: DRIVER_ACCEPTED,
    payload: data
  }
}

export const tripStarted = () => {
  return {
    type: TRIP_STARTED,
  }
}

export const getLocationWithCoords = (lat, lng) => {
  return dispatch => {
    let data = { latitude: lat, longitude: lng };
    locationService.getLocationWithCoords(data)
      .then((response) => {
        if (response.status === 201) {
          let coords = { latitude: lat, longitude: lng, description: response.data.message.formatted_address };
          dispatch(getLocationSuccessful(coords));
        } else {
          dispatch(showFlashMsg('Unable to get your location automatically, you will have to input manually'))
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Unable to get your location automatically, you will have to input manually'))
      })
  }
}

export const createTrip = (data) => {
  return dispatch => {
    tripService.createTrip(data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          if (response.data.message === 'You have Unpaid trip') {
            dispatch(showFlashMsg('You have unpaid trips to settle, contact support if this is an error'))
            dispatch(findDriverError())
            dispatch(triggerHistoryGet())
          } else {
            dispatch(tripCreationSuccessful(response.data));
            dispatch(showFlashMsg('Trip Booked'))
          }
        } else {
          dispatch(showFlashMsg(response.data.message))
        }
      })
      .catch((error) => {
        dispatch(stopLoading());
        dispatch(showFlashMsg('Something went wrong, please try again later'))
      })
  }
}

export const tripCanceledByUser = () => {
  return {
    type: TRIP_CANCELLED,
  }
}

export const cancelTrip = () => {
  return {
    type: CANCEL_TRIP,
  }
}

export const tripCompleted = (completedTripData) => {
  return {
    type: TRIP_COMPLETED,
    payload: completedTripData
  }
}

export const findDriverError = () => {
  return {
    type: FIND_DRIVER_ERROR,
  }
}

export const autoCompletData = (data) => {
  return {
    type: AUTO_COMPLETE_DATA,
    payload: data,
  }
}

export const getGeometryData = (data) => {
  return {
    type: GET_GEOMETRY,
    payload: data,
  }
}

export const getAutoCompletData = (data) => {
  return dispatch => {
    locationService.placeAutoComplete(data)
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          dispatch(autoCompletData(response.data.message.predictions));
        } else {
          dispatch(showFlashMsg(response.data.message))
        }
      })
      .catch((error) => {
      console.log(error)
    })
  }
}

export const getGeometry = (data) => {
  return dispatch => {
    locationService.getGeometry(data)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          let locationData = {
            description: response.data.message.results[0].formatted_address,
            latitude: response.data.message.results[0].geometry.location.lat,
            longitude: response.data.message.results[0].geometry.location.lng,
          }
          console.log(locationData);
          switch (data.locationInputType) {
            case 'yourLocation':
              dispatch(locationDetails(locationData))
              break;
            case 'destination':
              dispatch(destinationDetails(locationData))
              break;
            default:
              break;
          }
          // dispatch(showFlashMsg('Your destination has beeen set to ' + data.description));
          // saveToStorage('driverDestination', JSON.stringify(data));
        } else {
          dispatch(showFlashMsg(response.data.message))
        }
      })
      .catch((error) => {
      console.log(error)
    })
  }
}

export const resetHomeState = () => {
  return {
    type: RESET_HOME_STATE,
  }
}

export const getPolyline = (data) => {
  return dispatch => {
    locationService.getPolyline(data)
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          let polylineCoords = polyline.decode(response.data.message)
          let newPolyline = polylineCoords.map((point) => (
            {
              latitude: point[0],
              longitude: point[1]
            }
          ))
          console.log(newPolyline)
          dispatch(polylineData(newPolyline));
        } else {
          dispatch(showFlashMsg('Something went wrong, please try again later, if this error persst please contact support'))
        }
      })
      .catch((error) => {
        dispatch(showFlashMsg('Something went wrong, please try again later'))
      })
  }
}

export const polylineData = (data) => {
  return {
    type: POLYLINE,
    payload: data,
  }
}
