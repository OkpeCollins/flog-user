import { SUPPORT_DETAILS } from "../actions/support.type";

const initialState = {
  supportDetails: {}
}

export const supportReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUPPORT_DETAILS:
      return {
        ...state,
        supportDetails: action.payload,
      }
    default:
      return state;
  }
}