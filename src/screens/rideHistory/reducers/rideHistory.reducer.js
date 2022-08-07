import { RESET_STATE } from "../../signUp/actions/signUp.type";
import { SINGLE_HISTORY_COMPLETED, TRIP_HISTORY_COMPLETED, SINGLE_HISTORY_OTHERS, START_LOADING, STOP_LOADING, TRIP_HISTORY_OTHERS, TRIGGER_HISTORY_GET, RATE_RIDER_SUCCESFULL, RESET_RATING } from "../actions/rideHistory.type";

const initialState = {
  loading: false,
  completedHistoryData: [],
  singleCompletedHistory: {},
  otherHistoryData: [],
  singleOtherHistory: {},
  triggerHistoryGet: 0,
  rateRiderSuccessfull: false,
  triggerRateResposne: 0,
}

const rideHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case TRIP_HISTORY_OTHERS:
      return {
        ...state,
        otherHistoryData: action.payload,
      }
    case TRIP_HISTORY_COMPLETED:
      return {
        ...state,
        completedHistoryData: action.payload,
      }
    case SINGLE_HISTORY_COMPLETED:
      return {
        ...state,
        singleCompletedHistory: action.payload,
      }
    case SINGLE_HISTORY_OTHERS:
      return {
        ...state,
        singleOtherHistory: action.payload,
      }
    case TRIGGER_HISTORY_GET:
      return {
        ...state,
        triggerHistoryGet: Math.random(),
      }
    case RATE_RIDER_SUCCESFULL:
      return {
        ...state,
        rateRiderSuccessfull: true,
        triggerRateResposne: Math.random(),
      }
    case RESET_RATING:
      return {
        ...state,
        rateRiderSuccessfull: false,
      }
    case RESET_STATE:
      return initialState
    default:
      return state;
  }
}

export default rideHistoryReducer;