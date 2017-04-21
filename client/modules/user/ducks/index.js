export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

import { AUTH_SUCCESS } from '../../auth/ducks';

import { CREATE_COMPANY_SUCCESS } from '../../create/company/ducks';

export const initialState = {
  companies: {
    created: [],
    joined: [],
  },
  isFetching: false,
  isLoaded: false,
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        ...action.payload.data.user
      });
    case GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.errors.errors,
      });
    case AUTH_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        id: action.payload.data.id,
      });
    case CREATE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        companies: {
          created: [{
            name: action.payload.data.company.name,
          }]
        }
      });
    default:
      return state
  }
}

export const getUser = (userId) => ({ type: GET_USER_REQUEST, payload: { userId } });
