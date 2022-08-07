import { SUPPORT_DETAILS } from "./support.type";

export const supportDetails = (details) => {
  return {
    type: SUPPORT_DETAILS,
    payload: details,
  }
}