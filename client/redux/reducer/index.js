/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';

import auth from '../../modules/auth/ducks';
import modal from '../../modules/modal/ducks';

function intl(state, action) {
  return {
    locale: 'en'
  };
}

const rootReducer = combineReducers({
  auth,
  intl,
  modal,
});

export default rootReducer;
