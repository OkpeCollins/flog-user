import axios from 'axios';
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


function getLocationWithCoords(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
  }
  
  return axios.post(`${apiBaseUrl}/get-user-location`, data, options)
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

function placeAutoComplete(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/user-address-autocomplete/${data.address}`, options)
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

function getGeometry(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  }
  
  return axios.get(`${apiBaseUrl}/user-address-by-place-id/${data.placeId}`, options)
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

function getPolyline(data) {
  const options = {
    headers: { 'content-type': 'application/json' },
    timeout: 10000,
    validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  }
  }

  return axios.post(`${apiBaseUrl}/polyline`, data.coords, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
}

export const locationService = {
  getLocationWithCoords,
  placeAutoComplete,
  getGeometry,
  getPolyline,
}