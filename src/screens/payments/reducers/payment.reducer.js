import { RESET_STATE } from "../../signUp/actions/signUp.type";
import { CARD_ADDED, CARD_ADD_ERROR, LOADING, LOAD_USER_CARDS, PAYMENT_INITIATED, STOP_LOADING, UPDATE_CARDS } from "../actions/payments.type";

const initialState = {
  loading: false,
  userCards: [],
  paymentRes: {},
  toEnterOTP: false,
  toUpdate: 0
}

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case CARD_ADDED:
      return {
        ...state,
        loading: false,
        toEnterOTP: false,
        toUpdate: Math.random(),
      }
    case CARD_ADD_ERROR:
      return {
        ...state,
        loading: false,
        toEnterOTP: false,
      }
    case PAYMENT_INITIATED:
      return {
        ...state,
        paymentRes: action.payload,
        toEnterOTP: true,
      }
    case LOAD_USER_CARDS:
      return {
        userCards: action.payload,
      }
    case UPDATE_CARDS:
      return {
        ...state,
        toUpdate: action.payload,
      }
    case RESET_STATE:
      return initialState
    default:
      return state
  }
}

export default paymentReducer;