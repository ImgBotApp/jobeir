/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';

import authReducer from '../../modules/auth/ducks';

function intlReducer(state, action) {
  return {
    locale: 'en'
  };
}

const rootReducer = combineReducers({
  auth: authReducer,
  intl: intlReducer,
});

export default rootReducer;
