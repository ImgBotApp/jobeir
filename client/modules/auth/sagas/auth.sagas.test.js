import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import { redirectTo } from '../ducks'
import {
  authUser,
  signupUser,
  loginUser,
  logoutUser
} from './';

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

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'GET', '/auth')
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'AUTH_SUCCEEDED',
            payload: undefined
          })
        );
    });

    it('should redict to the correct pathname after AUTH_SUCCEDED', () => {
      const gen = authUser({ payload: { redirectPathname: '/' }});

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'GET', '/auth')
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'AUTH_SUCCEEDED',
            payload: undefined
          })
        );

      expect(gen.next().value)
        .toEqual(
          call(redirectTo, '/')
        );
    });

    it('should return a AUTH_FAILED action', () => {
      const gen = authUser(action);

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'GET', '/auth')
      );

      expect(
        gen.throw({
          error: 'unauthorized'
        }).value
      ).toEqual(
        put({
          type: 'AUTH_FAILED',
          error: { error: 'unauthorized' }
        })
      );
    });

    it('should redict to the correct pathname after AUTH_FAILED', () => {
      const gen = authUser({ payload: { redirectPathname: '/pathname' }});

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'GET', '/auth')
        );

      expect(
        gen.throw({
          error: 'unauthorized'
        }).value
      ).toEqual(
        put({
          type: 'AUTH_FAILED',
          error: { error: 'unauthorized' }
        })
      );

      expect(gen.next().value)
        .toEqual(
          call(redirectTo, '/login?next=/pathname')
        );
    });
  });

  describe('registration ', () => {
    it('should return a SIGNUP_SUCCEEDED action', () => {
      const gen = signupUser(action);

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'POST', '/register', action.payload)
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'SIGNUP_SUCCEEDED',
            payload: undefined
          })
        );
    });

    it('should return a SIGNUP_FAILED action', () => {
      const gen = signupUser(action);

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'POST', '/register', action.payload)
      );

      expect(
        gen.throw({
          error: 'user not found'
        }).value
      ).toEqual(
        put({
          type: 'SIGNUP_FAILED',
          error: { error: 'user not found' }
        })
      );
    });
  });

  describe('authentication ', () => {
    it('should return a LOGIN_SUCCEDED action', () => {
      const gen = loginUser(action);

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'POST', '/login', action.payload)
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'LOGIN_SUCCEEDED',
            payload: undefined
          })
        );
    });

    it('should return a LOGIN_FAILED action', () => {
      const gen = loginUser(action);

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'POST', '/login', action.payload)
      );

      expect(
        gen.throw({
          error: 'user not found'
        }).value
      ).toEqual(
        put({
          type: 'LOGIN_FAILED',
          error: { error: 'user not found' }
        })
      );
    });
  });

  describe('logout ', () => {
    it('should return a LOGOUT_SUCCEDED action', () => {
      const gen = logoutUser();

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'POST', '/logout')
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'LOGOUT_SUCCEEDED',
          })
        );
    });

    it('should return a LOGOUT_FAILED action', () => {
      const gen = logoutUser();

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'POST', '/logout')
      );

      expect(
        gen.throw({
          error: 'logout failed'
        }).value
      ).toEqual(
        put({
          type: 'LOGOUT_FAILED',
          error: { error: 'logout failed' }
        })
      );
    });
  })
});
