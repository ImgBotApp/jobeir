export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const SIGNUP_SUCCEEDED = 'SIGNUP_SUCCEEDED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const initialState = {
  user: null,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUESTED:
      return state;
    case SIGNUP_SUCCEEDED:
      return state;
    case SIGNUP_FAILED:
      return state;
    default:
      return state
  }
}

export const signup = (username, password) => ({ type: SIGNUP_REQUESTED, payload: { username, password }})
