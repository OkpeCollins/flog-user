import axios from 'axios';
import { apiBaseUrl } from '../constants/staticData';
import { showFlashMsg } from '../redux/rootAction';
import store from '../redux/store';
import { deleteFromStorage } from './localStorage.service';
// import got from 'got';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  // if (error.status === 401) {
  //   store.dispatch(showFlashMsg('You are an unathorized user, please login again'))        
  //   deleteFromStorage('user')
  //     .then((res) => {
  //       dispatch(logOut())           
  //     })
  // } else if (error.status === 403) {
  //   store.dispatch(showFlashMsg('You have been blocked, contact support for for help'))        
  //   deleteFromStorage('user')
  //     .then((res) => {
  //       dispatch(logOut())           
  //     })
  // }
  console.log(error.status);
  console.log(JSON.stringify(error));
  if (error.response && error.response.data) {
    return Promise.reject(error.response);
  }
return Promise.reject(error.message);
});

function signUp(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  return axios.post(`${apiBaseUrl}/user`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function sendCode(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.post(`${apiBaseUrl}/user-send-code`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function verifyCode(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.post(`${apiBaseUrl}/user-verify-code`, data, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      // console.log(error);
      // throw new Error(error)
      return error;
    })
}

function login(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.post(`${apiBaseUrl}/user-login`, data, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

function changePassword(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.patch(`${apiBaseUrl}/user-change-password`, data.details, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

function userCheck(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }

  return axios.get(`${apiBaseUrl}/user-check/${data.userId}`, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    })
}

function updateProfile(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.post(`${apiBaseUrl}/user-update`, data.details, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

function checkCoupon(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.get(`${apiBaseUrl}/check-coupon/${data.userId}`, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

function activateCoupon(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.post(`${apiBaseUrl}/coupon`, data.couponDetails, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

export const userService = {
  signUp,
  login,
  sendCode,
  verifyCode,
  changePassword,
  userCheck,
  updateProfile,
  checkCoupon,
  activateCoupon,
}