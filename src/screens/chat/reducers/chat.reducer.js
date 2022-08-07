import { MESSAGES, SET_RIDER_ID, SET_TRIP_ID, START_LOADING, STOP_LOADING } from "../actions/chat.type";

const initialState = {
  loading: false,
  tripId: null,
  riderId: null,
  messages: []
}

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      }
    case MESSAGES:
      return {
        ...state,
        messages: action.payload,
      }
    case SET_TRIP_ID:
      return {
        ...state,
        tripId: action.payload,
      }
    case SET_RIDER_ID:
      return {
        ...state,
        riderId: action.payload,
      }
    default:
      return state;
  }
}

export default chatReducer;