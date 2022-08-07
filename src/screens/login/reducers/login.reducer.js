import { LOADING, LOAD_USER, LOGIN, LOGIN_FAILED, LOGIN_SUCCESSFULL, LOG_OUT, STOP_LOADING, USER_CHECKED } from '../actions/login.type'
const initialState = {
  loading: false,
  loggedIn: false,
  user: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };
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
    case LOGIN_SUCCESSFULL:
      return {
        ...state,
        loading: false,
        user: action.payload,
        loggedIn: true,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      }
    case LOAD_USER:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      }
    case USER_CHECKED:
      return {
        ...state,
        userChecked: true,
      }
    case LOG_OUT:
      return initialState
    default:
      return state;
  }

}

export default loginReducer;