/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from '../../modules/auth/ducks';
import company from '../../modules/create/company/ducks';
import modal from '../../modules/modal/ducks';
import user from '../../modules/user/ducks';

const session = combineReducers({
  auth,
  user
});

function intl(state, action) {
  return {
    locale: 'en'
  };
}

const rootReducer = combineReducers({
  company,
  form,
  intl,
  modal,
  session,
});

export default rootReducer;
