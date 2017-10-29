/**
 * Redux Reducers
 */

import { combineReducers } from 'redux';
import * as storage from 'redux-storage';

import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import auth from '../../modules/auth/ducks';
import accountCompanies from '../../modules/account/create/company/ducks';
import intl from '../intl/';
import accountJobs from '../../modules/account/create/job/ducks';
import searchJobs from '../../modules/jobs/search/ducks';
import payments from '../../modules/payments/stripe/ducks/';
import posting from '../../modules/jobs/posting/ducks/';
import location from '../location/';
import modal from '../../modules/modal/ducks';
import user from '../../modules/user/ducks';

const session = combineReducers({
  auth,
  user
});

const account = combineReducers({
  jobs: accountJobs,
  companies: accountCompanies
});

const search = combineReducers({
  jobs: searchJobs
});

// creating an appReducer
export const appReducer = combineReducers({
  account,
  form,
  intl,
  location,
  modal,
  payments,
  posting,
  reduxAsyncConnect,
  routing,
  search,
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
