import authReducer, {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  initialState,
  auth,
  signup,
  login,
  logout,
  redirectTo,
} from '../';

// export const initialState = {
//   isAuthenticating: false,
//   isAuthenticated: false,
//   token: '',
//   errors: [],
// };

describe('[Ducks Auth]', () => {
  describe('authReducer', () => {
    it('should return the initialState', () => {
      expect(authReducer()).toEqual(initialState);
    });

    it('should return the correct state on AUTH_REQUEST', () => {
      const nextState = { data: {}, isAuthenticating: true };
      const action = { type: AUTH_REQUEST };

      expect(authReducer({ data: {} }, action)).toEqual(nextState);
    });

    it('should return the correct state on AUTH_SUCCESS', () => {
      const nextState = {
        isAuthenticated: true,
        isAuthenticating: false
      };
      const action = {
        payload: {
          data: {}
        },
        type: AUTH_SUCCESS
      };

      expect(authReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on AUTH_FAILURE', () => {
      const nextState = {
        isAuthenticating: false,
        isAuthenticated: false,
        errors: []
      };
      const action = {
        errors: {
          errors: []
        },
        type: AUTH_FAILURE
      };

      expect(authReducer({}, action)).toEqual(nextState);
    });
  });

  describe('auth', () => {
    it('should return the AUTH_REQUEST action', () => {
      expect(auth({})).toEqual({
        payload: {
          redirectPathname: {}
        }, 
        type: AUTH_REQUEST,
      });
    });
  });
});
