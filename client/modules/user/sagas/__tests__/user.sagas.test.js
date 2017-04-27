import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import { GET_USER_SUCCESS, GET_USER_FAILURE } from '../../ducks';
import { getUser } from '../';

const action = {
  payload: {
    data: {
      userId: '123',
    },
  },
};

describe('[Sagas User]', () => {
  describe('getUser', () => {
    it('should return a GET_USER_SUCCESS action', () => {
      const gen = getUser(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'GET', `/users/${action.payload.userId}`),
      );

      expect(gen.next().value).toEqual(
        put({
          type: GET_USER_SUCCESS,
          payload: undefined,
        }),
      );
    });

    it('should return a GET_USER_FAILURE action', () => {
      const gen = getUser(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'GET', `/users/${action.payload.userId}`),
      );

      expect(
        gen.throw({
          errors: 'unable to get user',
        }).value,
      ).toEqual(
        put({
          type: GET_USER_FAILURE,
          errors: { errors: 'unable to get user' },
        }),
      );
    });
  });
});
