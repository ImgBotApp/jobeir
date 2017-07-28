import { AUTH_SUCCESS } from '../../../auth/ducks';
import { CREATE_COMPANY_SUCCESS } from '../../../account/create/company/ducks';
import userReducer, {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  getUser,
  initialState
} from '../';

describe('[Ducks User]', () => {
  describe('userReducer', () => {
    it('should return the initialState', () => {
      expect(userReducer()).toEqual(initialState);
    });

    it('should return the correct state on GET_USER_REQUEST', () => {
      const nextState = { isFetching: true };
      const action = { type: GET_USER_REQUEST };

      expect(userReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on GET_USER_SUCCESS', () => {
      const nextState = {
        isFetching: false,
        isLoaded: true
      };
      const action = {
        type: GET_USER_SUCCESS,
        payload: {
          data: 'hello'
        }
      };

      expect(userReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on GET_USER_FAILURE', () => {
      const nextState = {
        isFetching: false,
        isLoaded: true,
        errors: ['error']
      };
      const action = {
        type: GET_USER_FAILURE,
        errors: {
          errors: ['error']
        }
      };

      expect(userReducer({}, action)).toEqual(nextState);
    });

    it('should return the correct state on AUTH_SUCCESS', () => {
      const nextState = {
        isAuthenticating: false,
        id: '123'
      };
      const action = {
        type: AUTH_SUCCESS,
        payload: {
          data: {
            id: '123'
          }
        }
      };

      expect(userReducer({}, action)).toEqual(nextState);
    });
  });
});
