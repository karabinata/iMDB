import * as actionTypes from './types';

const INITIAL_STATE = { userFavorites: {} };

const favReducer = (state = INITIAL_STATE, action) => {
  let userFavorites;
  switch (action.type) {
    case actionTypes.ADD_TO_FAVORITES:
      userFavorites = action.payload.favorites.reduce((accumulator, item) => {
        return {
          ...accumulator,
          [item.movieId]: {
            ...item
          }
        }
      }, {});

      return {
        ...state,
        userFavorites: { ...state.userFavorites, ...userFavorites }
      };
    case actionTypes.REMOVE_FAVORITE:
      const newFavorites = state.userFavorites;
      delete newFavorites[action.payload.favoriteToDelete];
      return {
        ...state,
        userFavorites: { ...newFavorites }
      };
    case actionTypes.GET_FAVORITES:
      userFavorites = action.payload.favorites.reduce((accumulator, item) => {
        return {
          ...accumulator,
          [item.movieId]: {
            ...item
          }
        }
      }, {});
      return {
        ...state,
        userFavorites
      };
    case actionTypes.CLEAR_FAVORITES:
      return {
        ...INITIAL_STATE
      }
    default:
      return state;
  }
};

export default favReducer;
