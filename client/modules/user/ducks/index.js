import { browserHistory } from 'react-router';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

import { AUTH_SUCCESS } from '../../auth/ducks';

import { CREATE_COMPANY_SUCCESS } from '../../create/company/ducks';

export const initialState = {
  companies: {
    created: [],
    joined: []
  },
  isFetching: false,
  isUpdating: false,
  isLoaded: false,
  agreedToValues: false,
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
        ...action.payload.data.user
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        ...action.payload.data.user
      });
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isUpdating: false,
        ...action.payload.data.user
      });
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.errors.errors
      });
    case UPDATE_USER_FAILURE:
      return Object.assign({}, state, {
        isUpdating: false,
        errors: action.errors.errors
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        id: action.payload.data.id
      });
    case CREATE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        companies: {
          created: [
            {
              name: action.payload.data.company.name
            }
          ]
        }
      });
    default:
      return state;
  }
};

export const getUser = userId => ({
  type: GET_USER_REQUEST,
  payload: { userId }
});

export const updateUser = (userId, data, redirectPathname) => ({
  type: UPDATE_USER_REQUEST,
  payload: { userId, data, redirectPathname }
});

export const redirectTo = redirectPathname =>
  browserHistory.push(redirectPathname);
