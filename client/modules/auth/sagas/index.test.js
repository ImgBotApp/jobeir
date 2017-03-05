import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
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
      const gen = logoutUser(action);

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'POST', '/logout', action.payload)
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'LOGOUT_SUCCEEDED',
            payload: undefined
          })
        );
    });

    it('should return a LOGOUT_FAILED action', () => {
      const gen = logoutUser(action);

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'POST', '/logout', action.payload)
      );

      expect(
        gen.throw({
          error: 'user not found'
        }).value
      ).toEqual(
        put({
          type: 'LOGOUT_FAILED',
          error: { error: 'user not found' }
        })
      );
    });
  });
});
