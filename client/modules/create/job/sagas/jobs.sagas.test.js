import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import { redirectTo } from '../ducks'
import {
  createJob,
} from './';

const action = {
  payload: {
    data: {
      title: 'developer'
    }
  }
};

describe('Job', () => {
  describe('creation', () => {
    it('should return a CREATE_JOB_SUCCESS action', () => {
      const gen = createJob(action);

      expect(gen.next().value)
        .toEqual(
          call(fetchApi, 'POST', '/jobs', action.payload.data)
        );

      expect(gen.next().value)
        .toEqual(
          put({
            type: 'CREATE_JOB_SUCCESS',
            payload: undefined
          })
        );
    });

    it('should return a CREATE_JOB_FAILURE action', () => {
      const gen = createJob(action);

      expect(
        gen.next().value
      ).toEqual(
        call(fetchApi, 'POST', '/jobs', action.payload.data)
      );

      expect(
        gen.throw({
          errors: 'unable to create job'
        }).value
      ).toEqual(
        put({
          type: 'CREATE_JOB_FAILURE',
          errors: { errors: 'unable to create job' }
        })
      );
    });
  });
});
