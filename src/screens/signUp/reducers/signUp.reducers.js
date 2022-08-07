import { SIGN_UP, SIGN_UP_STARTING, SIGN_UP_SUCCESSFUL, SIGN_UP_FAILED, TO_VERIFY, SEND_CODE_SUCCESS, SEND_CODE_FAILED, VERIFY_CODE_SUCCESS, LOGIN_SUCCESSFULL, RESET_TO_VERIFY, RESET_STATE, STOP_LOADING } from '../actions/signUp.type';

const initialState = {
  loading: false,
  loginLoading: false,
  userData: {},
  user: {},
  error: null,
  codeVerified: false,
  signUpSuccessful: false,
  toVerify: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case SIGN_UP_STARTING:
      return {
        ...state,
        loading: true,
      }
    case TO_VERIFY:
      return {
        ...state,
        userData: action.payload,
      }
    case SEND_CODE_SUCCESS:
      return {
        ...state,
        toVerify: true,
        loading: false,
        userData: action.payload,
      }
    case SEND_CODE_FAILED:
      return {
        ...state,
        loading: false
      }
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        codeVerified: true,
      }
    case SIGN_UP_SUCCESSFUL:
      return {
        ...state,
        // userData: action.payload,
        loading: false,
        signUpSuccessful: true,
      }
    case SIGN_UP_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case RESET_TO_VERIFY:
      return {
        ...state,
        toVerify: false,
      }
    case RESET_STATE:
      return initialState
    default:
      return state
  }
}

export default signUpReducer;