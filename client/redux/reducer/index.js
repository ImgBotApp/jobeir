/**
 * Redux Reducers
 */

import { combineReducers } from 'redux';
import * as storage from 'redux-storage';

import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import auth from '../../modules/auth/ducks';
import companies from '../../modules/create/company/ducks';
import intl from '../intl/';
import jobs from '../../modules/create/job/ducks';
import location from '../location/';
import modal from '../../modules/modal/ducks';
import user from '../../modules/user/ducks';

const session = combineReducers({
  auth,
  user
});

const account = combineReducers({
  jobs,
  companies
});

// creating an appReducer
export const appReducer = combineReducers({
  account,
  form,
  intl,
  location,
  modal,
  reduxAsyncConnect,
  routing,
  session
});

/**
 * rootReducer is a "global" reducer that will have access to all actions
 * and return a new state depending on the action. It's currently used
 * to reset state when a user decides to log out.
 */
const rootReducer = (state = {}, action = {}) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = window.__INITIAL_STATE__;
  }

  return appReducer(state, action);
};

export default rootReducer;
