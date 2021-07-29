import axios from '../apis/movies';

import { getCookie } from './auth';
import { NOTES_ENDPOINT } from '../constants';

export const getMovieNote = async (movieId) => {
  try {
    const token = getCookie('token');
    const response = await axios.get(`${NOTES_ENDPOINT}/${movieId}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
    return response.data.note;
  } catch (error) {
    console.log(error);
  }
};

export const addMovieNote = async (data) => {
  const token = getCookie('token');
  try {
    await axios.post(NOTES_ENDPOINT, { ...data }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateMovieNote = async (noteId, note) => {
  const token = getCookie('token');
  try {
    await axios.put(`${NOTES_ENDPOINT}/${noteId}`, { note }, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.log(error);
  }
}


