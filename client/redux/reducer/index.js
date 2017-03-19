/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from '../../modules/auth/ducks';
import modal from '../../modules/modal/ducks';

function intl(state, action) {
  return {
    locale: 'en'
  };
}

const rootReducer = combineReducers({
  auth,
  form,
  intl,
  modal,
});

export default rootReducer;
