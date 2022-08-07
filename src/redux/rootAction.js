import { HIDE_FLASH_MSG, SHOW_FLASH_MSG, LOCATION_SERVICE_ENABLED, } from "./rootType";

export function showFlashMsg(data) {
  return {
    type: SHOW_FLASH_MSG,
    payload: data,
  }
}

export function hideFlashMsg() {
  return {
    type: HIDE_FLASH_MSG
  }
}

export function locationServiceEnabled(data) {
  return {
    type: LOCATION_SERVICE_ENABLED,
    payload: data,
  }
}
