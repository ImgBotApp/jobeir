/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';

import loginReducer from '../../modules/login/ducks/';

function intlReducer(state, action) {
  return {
    locale: 'en'
  };
}

const rootReducer = combineReducers({
  intl: intlReducer,
  login: loginReducer,
});

export default rootReducer;
