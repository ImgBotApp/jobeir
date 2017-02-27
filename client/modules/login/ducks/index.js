export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const initialState = {
  user: null,
  isAuthenticating: false,
  isAuthenticated: false,
  errors: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return Object.assign({}, state, {
        isAuthenticating: true,

      });
    case LOGIN_SUCCEEDED:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        ...action.payload.data,
      });
    case LOGIN_FAILED:
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

export const login = (email, password) => ({ type: LOGIN_REQUESTED, payload: { email, password }})
