import { browserHistory } from 'react-router';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: '',
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case AUTH_REQUEST:
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
      });
    case AUTH_SUCCESS:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        ...action.payload.data,
      });
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        errors: action.errors.errors,
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        errors: action.errors.errors,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
};

export const auth = redirectPathname => ({
  type: AUTH_REQUEST,
  payload: { redirectPathname },
});
export const signup = (email, password, redirectPathname) => ({
  type: SIGNUP_REQUEST,
  payload: { email, password, redirectPathname },
});
export const login = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password },
});
export const logout = userId => ({ type: LOGOUT_REQUEST });
export const redirectTo = redirectPathname =>
  browserHistory.push(redirectPathname);
