import * as actionTypes from './types';
import axios from '../../apis/movies';
import { removeCookie, removeFromLocalStorage, isAuth } from '../../actions/auth';

export const signIn = (user) => async (dispatch) => {
  const response = await axios.post('/signin', user);
  const userData = { token: response.data.token, user: response.data.user };
  return dispatch({
    type: actionTypes.SIGN_IN,
    payload: {
      user: userData
    }
  });
};

export const signUp = (user) => async (dispatch) => {
  const response = await axios.post('/signup', user);
  const userData = { token: response.data.token, user: response.data.user };
  return dispatch({
    type: actionTypes.SIGN_UP,
    payload: {
      user: userData
    }
  });
};

export const signInFromCookie = () => async (dispatch) => {
  const user = isAuth();
  return dispatch({
    type: actionTypes.SIGN_IN,
    payload: {
      user: user
    }
  });
};

export const signOut = () => async (dispatch) => {
  await axios.get('/signout');
  removeCookie('token');
  removeFromLocalStorage('user');

  return dispatch({
    type: actionTypes.SIGN_OUT
  });
};


