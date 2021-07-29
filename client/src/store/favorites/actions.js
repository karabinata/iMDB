import * as actionTypes from './types';
import axios from '../../apis/movies';

import { FAVORITES_ENDPOINT } from '../../constants';
import { getCookie } from '../../actions/auth';

export const addToFavorites = (data) => async (dispatch) => {
  const token = getCookie('token');
  const response = await axios.post(FAVORITES_ENDPOINT, {...data}, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });  
  return dispatch({
    type: actionTypes.ADD_TO_FAVORITES,
    payload: {
      favorites: [{...data, id: response.data.id }]
    }
  });
};

export const fetchUserFavorites = () => async (dispatch) => {
  const token = getCookie('token');

  const response = await axios.get(FAVORITES_ENDPOINT, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
  return dispatch({
    type: actionTypes.GET_FAVORITES,
    payload: {
      favorites: response.data.favorites
    }
  });
}

export const deleteFromFavorites = (favId, movieId) => async (dispatch) => {
  const token = getCookie('token');
  await axios.delete(`${FAVORITES_ENDPOINT}/${favId}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
  });
  return dispatch({
    type: actionTypes.REMOVE_FAVORITE,
    payload: {
      favoriteToDelete: movieId
    }
  });
}

export const clearUserFavorites = () => async (dispatch) => {
  return dispatch({
    type: actionTypes.CLEAR_FAVORITES
  });
}


