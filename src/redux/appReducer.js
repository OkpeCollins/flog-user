import { combineReducers } from 'redux';
import chatReducer from '../screens/chat/reducers/chat.reducer';
import homeReducer from '../screens/home/reducers/home.reducer';
import loginReducer from '../screens/login/reducers/login.reducer';
import onboardingReducer from '../screens/onboarding/reducers/onboarding.reducer';
import paymentReducer from '../screens/payments/reducers/payment.reducer';
import rideHistoryReducer from '../screens/rideHistory/reducers/rideHistory.reducer';
import signUpReducer from '../screens/signUp/reducers/signUp.reducers';
import { supportReducer } from '../screens/support/reducers/support.reducer';
import { rootReducer } from './rootReducer';

const appReducer = combineReducers({
  onboard: onboardingReducer,
  login: loginReducer,
  signUp: signUpReducer,
  support: supportReducer,
  root: rootReducer,
  home: homeReducer,
  payment: paymentReducer,
  rideHistory: rideHistoryReducer,
  chat: chatReducer,
});

export default appReducer;