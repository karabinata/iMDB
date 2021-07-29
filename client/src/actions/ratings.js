import axios from '../apis/movies';

import { getCookie } from './auth';
import { RATINGS_ENDPOINT } from '../constants';

export const getMovieRating = async (movieId) => {
  try {
    const token = getCookie('token');
    const response = await axios.get(`${RATINGS_ENDPOINT}/${movieId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return response.data.rating;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addMovieRating = async (data) => {
  try {
    const token = getCookie('token');
    await axios.post(RATINGS_ENDPOINT, { ...data }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateMovieRating = async (ratingId, rating) => {
  try {
    const token = getCookie('token');
    await axios.put(`${RATINGS_ENDPOINT}/${ratingId}`, { rating }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
}


