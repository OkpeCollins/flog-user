import { RESET_STATE } from "../../signUp/actions/signUp.type";
import {
  AUTO_COMPLETE_DATA,
  CANCEL_TRIP,
  DESTINATION_DETAILS,
  DRIVER_ACCEPTED,
  FIND_DRIVER_ERROR,
  GET_GEOMETRY,
  GET_LOCATION_DETAILS_SUCCESS,
  LOADING,
  STOP_LOADING,
  LOCATION_DETAILS,
  PACKAGE_DESCRIPTION,
  TRIP_CANCELLED,
  TRIP_COMPLETED,
  TRIP_CREATED,
  TRIP_STARTED,
  TRIP_CREATION_UNSUCCESSFULL,
  RESET_HOME_STATE,
  DRIVER_FOUND,
  POLYLINE,
} from "../actions/home.type";

const initialState = {
  loading: false,
  locationDetails: {},
  destinationDetails: {},
  packageDescription: null,
  tripBooked: false,
  triggerFindDriver: null,
  tripData: {},
  driverFoundId: null,
  driverAccepted: false,
  acceptedTripData: {},
  tripStarted: false,
  completedTripData: {},
  triggerToBook: null,
  autoCompleteData: {},
  geometryData: {},
  polylineData: null
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case LOCATION_DETAILS:
      return {
        ...state,
        locationDetails: action.payload
      }
    case DESTINATION_DETAILS:
      return {
        ...state,
        destinationDetails: action.payload
      }
    case PACKAGE_DESCRIPTION:
      return {
        ...state,
        packageDescription: action.payload
      }
    case GET_LOCATION_DETAILS_SUCCESS:
      return {
        ...state,
        locationDetails: action.payload,
      }
    case AUTO_COMPLETE_DATA:
      return {
        ...state,
        autoCompleteData: action.payload
      }
    case GET_GEOMETRY:
      return {
        ...state,
        geometryData: action.payload
      }
    case TRIP_CREATED:
      return {
        ...state,
        tripBooked: true,
        tripData: action.payload,
        triggerFindDriver: Math.random(),
      }
      case DRIVER_FOUND:
        return {
          ...state,
          driverFoundId: action.payload,
        }
    case TRIP_CREATION_UNSUCCESSFULL:
      return {
        ...state,
        loading: false,
      }
    case DRIVER_ACCEPTED:
      return {
        ...state,
        driverAccepted: true,
        tripBooked: false,
        acceptedTripData: action.payload,
      }
    case TRIP_STARTED:
      return {
        ...state,
        tripStarted: true,
        driverAccepted: false,
      }
    case CANCEL_TRIP:
      return {
        ...state,
        loading: true,
      }
    case TRIP_CANCELLED:
      return {
        ...state,
        loading: false,
        destinationDetails: {},
        packageDescription: null,
        tripBooked: false,
        triggerFindDriver: null,
        tripData: {},
        driverAccepted: false,
        acceptedTripData: {},
        tripStarted: false,
        completedTripData: {},
        triggerToBook: null,
      }
    case TRIP_COMPLETED:
      return {
        ...state,
        completedTripData: action.payload,
      }
    case FIND_DRIVER_ERROR:
      return {
        ...state,
        triggerToBook: Math.random(),
        loading: false,
        destinationDetails: {},
        packageDescription: null,
        tripBooked: false,
        triggerFindDriver: null,
        tripData: {},
        driverAccepted: false,
        acceptedTripData: {},
        tripStarted: false,
        completedTripData: {},
      }
    case POLYLINE:
      return {
        ...state,
        polylineData: action.payload
      }
    case RESET_STATE:
      return initialState
    default:
      return state
  }
}

export default homeReducer;