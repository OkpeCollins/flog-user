import { showFlashMsg } from '../../../redux/rootAction';
import { deleteFromStorage, saveToStorage } from '../../../services/localStorage.service';
import { userService } from '../../../services/user.service';
import { LOADING, LOAD_USER, LOGIN, LOGIN_FAILED, LOGIN_SUCCESSFULL, LOG_OUT, STOP_LOADING, USER_CHECKED } from './login.type';

// export const logIn = () => {
//   return {
//     type: LOGIN,
//   }
// }

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

export const loginSuccesfull = (data) => {
  return {
    type: LOGIN_SUCCESSFULL,
    payload: data,
  }
}

export const loginFailed = (data) => {
  return {
    type: LOGIN_FAILED
  }
}

export const loadUser = (data) => {
  return {
    type: LOAD_USER,
    payload: data,
  }
}

export const logOut = () => {
  return {
    type: LOG_OUT,
  }
}

export const logIn = (data) => {
  return dispatch => {
    dispatch(loading());
    userService.login(data)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          dispatch(showFlashMsg('Login  successfull'))
          let user = response.data.userData.data.user;
          let tokens = response.data.userData.data.tokens;
          user = {...user, tokens}
          saveToStorage('user', JSON.stringify(user))
          dispatch(loginSuccesfull(user));
        } else {
          console.log(response);
          let message = response.data.message ? response.data.message : 'Something went wrong, Please, check your network and try again later'
          dispatch(showFlashMsg(message))
          dispatch(loginFailed(response.data.message));
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg(error.message))
          dispatch(loginFailed(error.message));
        // console.log(error.data.error.message);
      })
  } 
}

export const changePassword = (data) => {
  return dispatch => {
    dispatch(loading());
    userService.changePassword(data)
      .then((response) => {
          console.log(response);
          dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(showFlashMsg('Password Changed successfully, and can be use when next you login'))
        } else {
          console.log(response);
          let message = response.data.message ? response.data.message : 'Something went wrong, Please, check your input and make sure your current password is correct'
          dispatch(showFlashMsg(message))
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg(error.message))
        // console.log(error.data.error.message);
      })
  } 
}

export const userCheck = (data) => {
  return dispatch => {
    userService.userCheck(data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(userChecked())
        } else {
          if (response.status === 401) {
            dispatch(showFlashMsg('You are an unathorized user, please login again'))        
            deleteFromStorage('user')
              .then((res) => {
                dispatch(logOut())           
              })
          } else if (response.status === 403) {
            dispatch(showFlashMsg('You have been blocked, contact support for for help'))        
            deleteFromStorage('user')
              .then((res) => {
                dispatch(logOut())           
              })
          }
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Something went wrong, Please try again later'))
        // console.log(error.data.error.message);
      })
  } 
}

export const userChecked = () => {
  return {
    type: USER_CHECKED,
  }
}

export const updateProfile = (data) => {
  return dispatch => {
    dispatch(loading());
    userService.updateProfile(data)
      .then((response) => {
          console.log(response);
          dispatch(stopLoading());
        if (response.status === 201) {
          dispatch(showFlashMsg('Profile Updated Successfully'))
          let user = response.data.userData.data.user;
          let tokens = response.data.userData.data.tokens;
          user = {...user, tokens}
          console.log(user)
          saveToStorage('user', JSON.stringify(user))
          dispatch(loadUser(user))
        } else {
          let message = response.data.message ? response.data.message : 'Something went wrong, Please try again later'
          dispatch(showFlashMsg(message))
        }
      })
      .catch((error) => {
          dispatch(showFlashMsg('Something went wrong, Please try again later'))
        // console.log(error.data.error.message);
      })
  } 
}