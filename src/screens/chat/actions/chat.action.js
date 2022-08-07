import { MESSAGES, SET_RIDER_ID, SET_TRIP_ID, START_LOADING, STOP_LOADING } from "./chat.type"
import {chatServices} from '../../../services/chat.service'

export const startLoading = () => {
  return {
    type: START_LOADING
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
}

export const setMessages = (data) => {
  return {
    type: MESSAGES,
    payload: data
  }
}

export const setTripId = (data) => {
  return {
    type: SET_TRIP_ID,
    payload: data,
  }
}

export const setRiderId = (data) => {
  return {
    type: SET_RIDER_ID,
    payload: data,
  }
}

export const getMessages = (data) => {
  return dispatch => {
    chatServices.getMessages(data)
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          dispatch(setMessages(response.data.message[0].messages.reverse()));
        } else {
          dispatch(showFlashMsg('Error getting your previous chat'))
        }
      })
      .catch((error) => {
      console.log(error)
      })
  }
}

export const saveMessage = (data) => {
  return dispatch => {
    chatServices.saveNewMessages(data)
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
          console.log(response)
          // dispatch(setMessages(response.data.message));
        } else {
          dispatch(showFlashMsg('Error saving your previous chat'))
        }
      })
      .catch((error) => {
      console.log(error)
      })
  }
}
