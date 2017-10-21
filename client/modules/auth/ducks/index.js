import { browserHistory } from 'react-router';

export const SERVER_AUTH_REQUEST = 'SERVER_AUTH_REQUEST';
export const SERVER_AUTH_SUCCESS = 'SERVER_AUTH_SUCCESS';
export const SERVER_AUTH_FAILURE = 'SERVER_AUTH_FAILURE';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILURE = 'PASSWORD_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SESSION_LOADED = 'SESSION_LOADED';

export const initialState = {
  isAuthenticating: false,
  isAuthenticated: false,
  isLoaded: false,
  globalIsLoaded: false,
  isResettingPassword: false,
  resetPasswordSent: false,
  token: '',
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SESSION_LOADED:
      return Object.assign({}, state, {
        globalIsLoaded: true
      });
    case SERVER_AUTH_REQUEST:
    case AUTH_REQUEST:
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      });
    case SERVER_AUTH_SUCCESS:
    case AUTH_SUCCESS:
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        isLoaded: true,
        ...action.payload.data
      });
    case LOGOUT_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        errors: action.errors.errors
      });
    case RESET_REQUEST:
    case PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isResettingPassword: true
      });
    case RESET_SUCCESS:
    case PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isResettingPassword: false,
        resetPasswordSent: true,
        ...action.payload.data
      });
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        isLoaded: true,
        errors: action.errors.errors
      });
    case RESET_FAILURE:
    case PASSWORD_FAILURE:
      return Object.assign({}, state, {
        errors: action.errors.errors
      });
    case AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        isLoaded: true,
        errors: action.errors.errors
      });
    case SERVER_AUTH_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        isLoaded: true
        // errors: action.payload.errors
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState, {
        globalIsLoaded: true
      });

    default:
      return state;
  }
};

export function shouldCheckAuth(globalState) {
  const isLoaded = globalState.session.auth.globalIsLoaded;
  const isAuthenticating =
    globalState.session.auth && globalState.session.auth.isAuthenticating;

  return !isAuthenticating && !isLoaded;
}

export const auth = redirectPathname => ({
  type: AUTH_REQUEST,
  payload: { redirectPathname }
});

export const reset = email => ({
  type: RESET_REQUEST,
  payload: { email }
});

export const password = (resetPasswordToken, confirmPassword, password) => ({
  type: PASSWORD_REQUEST,
  payload: { resetPasswordToken, confirmPassword, password }
});

export const signup = (data, redirectPathname) => ({
  type: SIGNUP_REQUEST,
  payload: { ...data, redirectPathname }
});

export const login = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: { email, password }
});

export const logout = userId => ({ type: LOGOUT_REQUEST });

export const redirectTo = redirectPathname =>
  browserHistory.push(redirectPathname);
