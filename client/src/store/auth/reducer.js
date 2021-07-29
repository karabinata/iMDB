import * as actionTypes from './types';

const INITIAL_STATE = { user: null };

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        user: action.payload.user
      };
    case actionTypes.SIGN_UP:
      return {
        ...state,
        user: action.payload.user
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default authReducer;
