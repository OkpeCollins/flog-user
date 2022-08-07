import { ONBOARD } from "../actions/onboarding.type";

const initialState = {
  onboared: false,
};

const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONBOARD:
      return {
        ...state,
        onboared: true,
      };
    default:
      return state;
  }
}

export default onboardingReducer;