/**
 * Redux Reducers
 */
 
import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import auth from '../../modules/auth/ducks';
import company from '../../modules/create/company/ducks';
import job from '../../modules/create/job/ducks';
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

// creating an appReducer
export const appReducer = combineReducers({
  company,
  job,
  form,
  intl,
  modal,
  routing,
  session,
});

/**
 * rootReducer is a "global" reducer that will have access to all actions
 * and return a new state depending on the action. It's currently used
 * to reset state when a user decides to log out.
 */
const rootReducer = (state = {}, action = {}) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
