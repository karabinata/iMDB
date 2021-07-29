import * as actionTypes from './types';

const INITIAL_STATE = [];

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_MOVIES_BY_NAME.SUCCESS:
      return {
        ...state,
        movieList: action.payload.movies
      };
    case actionTypes.GET_MOVIES_BY_NAME.FAIL:
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default moviesReducer;
