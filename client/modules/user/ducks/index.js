import { browserHistory } from 'react-router';
import { AUTH_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../auth/ducks';
import { CREATE_COMPANY_SUCCESS } from '../../account/create/company/ducks';

export const SERVER_GET_USER_REQUEST = 'SERVER_GET_USER_REQUEST';
export const SERVER_GET_USER_SUCCESS = 'SERVER_GET_USER_SUCCESS';
export const SERVER_GET_USER_FAILURE = 'SERVER_GET_USER_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const SWITCH_ACTIVE_COMPANY_REQUEST = 'SWITCH_ACTIVE_COMPANY_REQUEST';
export const SWITCH_ACTIVE_COMPANY_SUCCESS = 'SWITCH_ACTIVE_COMPANY_SUCCESS';
export const SWITCH_ACTIVE_COMPANY_FAILURE = 'SWITCH_ACTIVE_COMPANY_FAILURE';

export const initialState = {
  companies: {
    created: [],
    joined: []
  },
  firstName: '',
  lastName: '',
  isFetching: false,
  isUpdating: false,
  isLoaded: false,
  agreedToValues: false,
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVER_GET_USER_REQUEST:
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
        ...action.payload.data.user
      });
    case SERVER_GET_USER_SUCCESS:
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
    case SERVER_GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.payload.errors
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
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export function shouldGetUser(globalState) {
  const isLoaded = globalState.session.auth.globalIsLoaded;

  const isFetching =
    globalState.session.user && globalState.session.user.isFetching;
  const hasId = globalState.session.auth.id;

  return hasId && !isFetching && !isLoaded;
}

export const getUser = userId => ({
  type: GET_USER_REQUEST,
  payload: { userId }
});

export const updateUser = (userId, data, redirectPathname) => ({
  type: UPDATE_USER_REQUEST,
  payload: { userId, data, redirectPathname }
});

export const switchCompany = (data, userId) => ({
  type: SWITCH_ACTIVE_COMPANY_REQUEST,
  payload: { data, userId }
});

export const redirectTo = redirectPathname =>
  browserHistory.push(redirectPathname);
