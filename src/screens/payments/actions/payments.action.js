import { showFlashMsg } from "../../../redux/rootAction"
import { paymentService } from "../../../services/payments.service"
import { LOADING, CARD_ADDED, STOP_LOADING, PAYMENT_INITIATED, CARD_ADD_ERROR, LOAD_USER_CARDS, UPDATE_CARDS } from "./payments.type"

export const startLoading = () => {
  return {
    type: LOADING
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING
  }
}

export const cardAdded = (data) => {
  return {
    type: CARD_ADDED,
    payload: data
  }
}

export const loadUserCards = (data) => {
  return {
    type: LOAD_USER_CARDS,
    payload: data
  }
}

export const toUpdateCards = (data) => {
  return {
    type: UPDATE_CARDS,
    payload: data
  }
}

export const cardAddError = () => {
  return {
    type: CARD_ADD_ERROR,
  }
}

export const paymentInitiatedSuccessfully = (data) => {
  return {
    type: PAYMENT_INITIATED,
    payload: data,
  }
}

export const addNewCard = (details) => {
  return dispatch => {
    dispatch(startLoading());
    paymentService.addNewCard(details)
      .then((response) => {
        dispatch(stopLoading());
        console.log(response)
        if (response.status === 201) {
          dispatch(showFlashMsg('Verify the OTP sent to your phone'))
          dispatch(paymentInitiatedSuccessfully(response.data))
        } else {
          let message = response.data.message ? response.data.message : 'Something went wrong, Please, check your network and try again later'
          dispatch(showFlashMsg(message))
        }
    })
    .catch((error) => {
      console.log(error)
      dispatch(showFlashMsg('Something went wrong, Please, check your network and try again later'))
      dispatch(cardAddError())
    })
  }
}

export const verifyOTP = (details) => {
  return dispatch => {
    dispatch(startLoading());
    paymentService.verifyOTP(details)
      .then((response) => {
        dispatch(stopLoading());
        console.log(response)
        if (response.status === 201) {
          dispatch(showFlashMsg('Card added to your account succesfully'))
          dispatch(cardAdded(response.data))
        } else {
          let message = response.data.message ? response.data.message : 'Something went wrong, Please, check your network and try again later'
          dispatch(showFlashMsg(message))
          dispatch(cardAddError())
        }
    })
    .catch((error) => {
      console.log(error)
      dispatch(showFlashMsg('Something went wrong, Please, check your network and try again later'))
      dispatch(cardAddError())
    })
  }
}

export const getUserCards = (details) => {
  return dispatch => {
    dispatch(startLoading());
    paymentService.getUserCards(details)
      .then((response) => {
        dispatch(stopLoading());
        console.log(response)
        if (response.status === 201) {
          // dispatch(showFlashMsg('Card added to your account succesfully'))
          dispatch(loadUserCards(response.data.data))
        } else {
          let message = response.data.message ? response.data.message : 'Something went wrong, Error, getting your cards. Please, check your network and try again later'
          dispatch(showFlashMsg(message))
          // dispatch(cardAddError())
        }
    })
    .catch((error) => {
      console.log(error)
      dispatch(showFlashMsg('Something went wrong, Error getting your cards. Please, check your network and try again later'))
      // dispatch(cardAddError())
    })
  }
}

export const setDefaultPaymentMethod = (details) => {
  return dispatch => {
    dispatch(startLoading());
    paymentService.setDefaultPaymentMethod(details)
      .then((response) => {
        dispatch(stopLoading());
        if (response.status === 201) {
          // dispatch(showFlashMsg('Card added to your account succesfully'))
          dispatch(toUpdateCards(Math.random()));
        } else {
          let message = response.data.message ? response.data.message : 'Something went wrong, Error Changing your default card'
          dispatch(showFlashMsg(message))
        }
    })
    .catch((error) => {
      console.log(error)
      dispatch(showFlashMsg('Something went wrong, Error Changing your default card'))
      // dispatch(cardAddError())
    })
  }
}