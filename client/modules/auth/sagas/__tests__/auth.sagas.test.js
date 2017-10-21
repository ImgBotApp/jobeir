import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  redirectTo
} from '../../ducks';
import { authUser, signupUser, loginUser, logoutUser } from '../';

const action = {
  payload: {
    email: 'email@gmail.com',
    password: 'password'
  }
};

describe('User', () => {
  describe('check authentication', () => {
    it('should return a AUTH_SUCCEDED action', () => {
      const gen = authUser(action);

      expect(gen.next().value).toEqual(call(fetchApi, 'GET', '/auth'));

      expect(gen.next().value).toEqual(
        put({
          type: AUTH_SUCCESS,
          payload: undefined
        })
      );
    });

    it('should redict to the correct pathname after AUTH_SUCCEDED', () => {
      const gen = authUser({ payload: { redirectPathname: '/' } });

      expect(gen.next().value).toEqual(call(fetchApi, 'GET', '/auth'));

      expect(gen.next().value).toEqual(
        put({
          type: AUTH_SUCCESS,
          payload: undefined
        })
      );

      expect(gen.next().value).toEqual(call(redirectTo, '/'));
    });

    it('should return a AUTH_FAILURE action', () => {
      const gen = authUser(action);

      expect(gen.next().value).toEqual(call(fetchApi, 'GET', '/auth'));

      expect(
        gen.throw({
          errors: 'unauthorized'
        }).value
      ).toEqual(
        put({
          type: AUTH_FAILURE,
          errors: { errors: 'unauthorized' }
        })
      );
    });

    it('should redict to the correct pathname after AUTH_FAILURE', () => {
      const gen = authUser({ payload: { redirectPathname: '/pathname' } });

      expect(gen.next().value).toEqual(call(fetchApi, 'GET', '/auth'));

      expect(
        gen.throw({
          errors: 'unauthorized'
        }).value
      ).toEqual(
        put({
          type: AUTH_FAILURE,
          errors: { errors: 'unauthorized' }
        })
      );

      expect(gen.next().value).toEqual(
        call(redirectTo, '/signin?next=/pathname')
      );
    });
  });

  describe('registration ', () => {
    it('should return a SIGNUP_SUCCESS action', () => {
      const gen = signupUser(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'POST', '/register', action.payload)
      );

      expect(gen.next().value).toEqual(
        put({
          type: SIGNUP_SUCCESS,
          payload: undefined
        })
      );
    });

    it('should return a SIGNUP_FAILURE action', () => {
      const gen = signupUser(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'POST', '/register', action.payload)
      );

      expect(
        gen.throw({
          errors: 'user not found'
        }).value
      ).toEqual(
        put({
          type: SIGNUP_FAILURE,
          errors: { errors: 'user not found' }
        })
      );
    });
  });

  describe('authentication ', () => {
    it('should return a LOGIN_SUCCEDED action', () => {
      const gen = loginUser(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'POST', '/login', action.payload)
      );

      expect(gen.next().value).toEqual(
        put({
          type: LOGIN_SUCCESS,
          payload: undefined
        })
      );
    });

    it('should return a LOGIN_FAILURE action', () => {
      const gen = loginUser(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'POST', '/login', action.payload)
      );

      expect(
        gen.throw({
          errors: 'user not found'
        }).value
      ).toEqual(
        put({
          type: LOGIN_FAILURE,
          errors: { errors: 'user not found' }
        })
      );
    });
  });

  describe('logout ', () => {
    it('should return a LOGOUT_SUCCEDED action', () => {
      const gen = logoutUser();

      expect(gen.next().value).toEqual(call(fetchApi, 'POST', '/logout'));

      expect(gen.next().value).toEqual(
        put({
          type: LOGOUT_SUCCESS
        })
      );
    });

    it('should return a LOGOUT_FAILURE action', () => {
      const gen = logoutUser();

      expect(gen.next().value).toEqual(call(fetchApi, 'POST', '/logout'));

      expect(
        gen.throw({
          errors: 'logout failed'
        }).value
      ).toEqual(
        put({
          type: LOGOUT_FAILURE,
          errors: { errors: 'logout failed' }
        })
      );
    });
  });
});
