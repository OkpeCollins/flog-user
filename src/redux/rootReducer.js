import { HIDE_FLASH_MSG, LOCATION_SERVICE_ENABLED, SHOW_FLASH_MSG } from './rootType';

const initialState = {
  showFlashMsg: false,
  flashMsg: null,
  locationServiceEnabled: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FLASH_MSG:
      return {
        ...state,
        showFlashMsg: true,
        flashMsg: action.payload,
      }
    case HIDE_FLASH_MSG:
      return {
        ...state,
        showFlashMsg: false
      }
    case LOCATION_SERVICE_ENABLED:
      return {
        ...state,
        locationServiceEnabled: action.payload
      }
  
    default:
      return state;
  }
}