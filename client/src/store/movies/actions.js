import * as actionTypes from './types';
import axios from '../../apis/movies';

import { MOVIES_ENDPOINT } from '../../constants';

export const getMoviesByName = (name) => async (dispatch) => {
  try {
    const response = await axios.get(`${MOVIES_ENDPOINT}/${name}`);
    return dispatch({
      type: actionTypes.GET_MOVIES_BY_NAME.SUCCESS,
      payload: { movies: response.data.movies }
    })
  } catch (error) {
    return dispatch({
      type: actionTypes.GET_MOVIES_BY_NAME.FAIL
    });
  }
};