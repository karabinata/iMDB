import { combineReducers } from 'redux';

import favReducer from './favorites/reducer'; 
import moviesReducer from './movies/reducer'; 
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favReducer,
  movies: moviesReducer
});

export default rootReducer;