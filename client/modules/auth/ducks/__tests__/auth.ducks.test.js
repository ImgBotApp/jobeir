import authReducer, {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  initialState,
  auth,
  login,
  logout,
  signup
} from '../';

describe('[Ducks Auth]', () => {
  describe('authReducer()', () => {
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
        isAuthenticating: false,
        isLoaded: true
      };
      const action = {
        payload: {
          data: {}
        },
        type: AUTH_SUCCESS
      };

      expect(authReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on SIGNUP_FAILURE', () => {
      const nextState = {
        isAuthenticating: false,
        isAuthenticated: false,
        isLoaded: true,
        errors: []
      };
      const action = {
        errors: {
          errors: []
        },
        type: SIGNUP_FAILURE
      };

      expect(authReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on SIGNUP_SUCCESS', () => {
      const nextState = {
        isAuthenticated: true,
        isAuthenticating: false,
        isLoaded: true
      };
      const action = {
        payload: {
          data: {}
        },
        type: SIGNUP_SUCCESS
      };

      expect(authReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on SIGNUP_FAILURE', () => {
      const nextState = {
        isAuthenticating: false,
        isAuthenticated: false,
        isLoaded: true,
        errors: []
      };
      const action = {
        errors: {
          errors: []
        },
        type: SIGNUP_FAILURE
      };

      expect(authReducer({}, action)).toEqual(nextState);
    });
  });

  describe('auth()', () => {
    it('should return the AUTH_REQUEST action', () => {
      expect(auth({})).toEqual({
        payload: {
          redirectPathname: {}
        },
        type: AUTH_REQUEST
      });
    });
  });

  describe('login()', () => {
    it('should return the LOGIN_REQUEST action', () => {
      expect(login({}, {})).toEqual({
        payload: {
          email: {},
          password: {}
        },
        type: LOGIN_REQUEST
      });
    });
  });

  describe('logout()', () => {
    it('should return the LOGOUT_REQUEST action', () => {
      expect(logout()).toEqual({ type: LOGOUT_REQUEST });
    });
  });

  describe('signup()', () => {
    it('should return the SIGNUP_REQUEST action', () => {
      expect(signup({}, {})).toEqual({
        payload: {
          redirectPathname: {}
        },
        type: SIGNUP_REQUEST
      });
    });
  });
});
