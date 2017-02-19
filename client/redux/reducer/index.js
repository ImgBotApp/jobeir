/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';

const initialState = { hello: 'world' };

function homeReducer(state = initialState, action) {
  return state;
}

function intlReducer(state = initialState, action) {
  return { locale: 'en' };
}

const rootReducer = combineReducers({
  home: homeReducer,
  int: intlReducer,
});

export default rootReducer;
