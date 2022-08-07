import axios from 'axios';
import { useSelector } from 'react-redux';
import { apiBaseUrl } from '../constants/staticData';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response && error.response.data) {
    return Promise.reject(error.response);
  }
return Promise.reject(error.message);
});


function addNewCard(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }
  
  return axios.post(`${apiBaseUrl}/user-payment`, data.cardDetails, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

function verifyOTP(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }
  
  return axios.post(`${apiBaseUrl}/user-confirm-otp`, data.details, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

function getUserCards(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
  }
  
  return axios.get(`${apiBaseUrl}/user-all-user-cards/${data.userId}`, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

function setDefaultPaymentMethod(data) {
  const options = {
    headers: { 'content-type': 'application/json', 'Authorization': data.authorization},
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.post(`${apiBaseUrl}/user-default-payment-method`, data.details, options)
    .then((response) => {
      // console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      // throw new Error(error)
      return error;
    })
}

export const paymentService = {
  addNewCard,
  verifyOTP,
  getUserCards,
  setDefaultPaymentMethod,
}