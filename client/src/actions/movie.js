import axios from '../apis/movies';

import { MOVIES_ENDPOINT } from '../constants';

export const getMovie = async (movieId) => {
  try {
    const response = await axios.get(`${MOVIES_ENDPOINT}/show/${movieId}`);
    console.log(response.data)
    return response.data.movie;
  } catch (error) {
    console.log(error);
  }
};



