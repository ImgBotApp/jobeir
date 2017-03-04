export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNUP_SUCCEEDED = 'SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const initialState = {
  user: null,
  isAuthenticating: false,
  isAuthenticated: false,
  token: '',
  errors: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
    case SIGNUP_REQUESTED:
    case LOGOUT_REQUESTED:
      return Object.assign({}, state, {
        isAuthenticating: true,
      });
    case LOGIN_SUCCEEDED:
    case SIGNUP_SUCCEEDED:
    case LOGOUT_FAILED:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        ...action.payload.data,
      });
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
    case LOGOUT_SUCCEEDED:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        ...action.payload.data,
        errors: action.payload.errors,
      });
    default:
      return state
  }
}

export const signup = (email, password) => ({ type: SIGNUP_REQUESTED, payload: { email, password }})
export const login = (email, password) => ({ type: LOGIN_REQUESTED, payload: { email, password }})
export const logout = (email, password) => ({ type: LOGOUT_REQUESTED, payload: { email, password }})
