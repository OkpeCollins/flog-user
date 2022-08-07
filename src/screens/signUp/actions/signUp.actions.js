import { showFlashMsg } from '../../../redux/rootAction';
import { saveToStorage } from '../../../services/localStorage.service';
import { userService } from '../../../services/user.service';
import {
  SIGN_UP_STARTING,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
  TO_VERIFY,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAILED,
  VERIFY_CODE_SUCCESS,
  LOGIN_SUCCESSFULL,
  RESET_TO_VERIFY,
  RESET_STATE,
  STOP_LOADING,
} from './signUp.type';

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  }
}

export const signUpStarting = () => {
  return {
    type: SIGN_UP_STARTING,
  }
}

export const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESSFUL,
    payload: data
  }
}

export const sendCodeSuccess = (data) => {
  return {
    type: SEND_CODE_SUCCESS,
    payload: data,
  }
}

export const sendCodeFailed = (data) => {
  return {
    type: SEND_CODE_FAILED,
  }
}

export const VerifyCodeSuccess = () => {
  return {
    type: VERIFY_CODE_SUCCESS,
  }
}

export const signUpFailed = (data) => {
  return {
    type: SIGN_UP_FAILED,
    payload: data
  }
}

export const toVerify = (data) => {
  return {
    type: TO_VERIFY,
    payload: data
  }
}

export const resetToVerify = (data) => {
  return {
    type: RESET_TO_VERIFY,
    payload: data
  }
}

export const sendCode = (data) => {
  return dispatch => {
    dispatch(signUpStarting());
      userService.sendCode({mobile: data.mobile})
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(sendCodeSuccess(data));
          dispatch(showFlashMsg(response.data.message))
        } else {
          console.log(response);
          dispatch(sendCodeFailed(data));
          dispatch(showFlashMsg('Someting went wrong please try again, if this persist please contact the FLOG.'))
        }
      })
      .catch((error) => {
          console.log('error: ' + error);
          dispatch(showFlashMsg(error.message))
          dispatch(sendCodeFailed(response.data.message));
        // console.log(error.data.error.message);
      })
  } 
}

export const verifyCode = (data) => {
  return dispatch => {
    dispatch(signUpStarting());
    userService.verifyCode(data)
    .then((response) => {
      console.log(response);
      dispatch(stopLoading())
      if (response.status === 200) {
        dispatch(VerifyCodeSuccess());
        dispatch(showFlashMsg('Number Verified Successfully'))
      } else {
        console.log(response);
        dispatch(showFlashMsg(response.data.message + 'Someting went wrong please try again, if this persist please contact the FLOG.'))
      }
    })
    .catch((error) => {
        console.log('error: ' + error);
        dispatch(showFlashMsg(error.message))
        dispatch(sendCodeFailed(response.data.message));
      // console.log(error.data.error.message);
    })
}
}

export const signUp = (signUpData) => {
  return dispatch => {
    dispatch(signUpStarting());
    userService.signUp(signUpData)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          dispatch(showFlashMsg('SignUp successfully, Please Head over to login page to login.'))
          dispatch(signUpSuccess(response.data));
          dispatch(resetState())
          saveToStorage('userData', JSON.stringify(response.data))
        } else {
          dispatch(showFlashMsg(response.data.message + 'Please try again'))
          dispatch(signUpFailed(response.data.message));
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg(error.message))
          dispatch(signUpFailed(error.message));
        // console.log(error.data.error.message);
      })
  } 
}

export const resetState = () => {
  return {
    type: RESET_STATE,
  }
}