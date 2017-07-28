import { call, put } from 'redux-saga/effects';
import { fetchApi } from '../../../../../../utils/api';
import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE
} from '../../ducks';
import { createJob } from '../';

const action = {
  payload: {
    data: {
      title: 'developer'
    },
    companyId: 123
  }
};

describe('[Sagas Job]', () => {
  describe('creation', () => {
    it('should return a CREATE_JOB_SUCCESS action', () => {
      const gen = createJob(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'POST', '/company/123/jobs', action.payload.data)
      );

      expect(gen.next().value).toEqual(
        put({
          type: CREATE_JOB_SUCCESS,
          payload: undefined
        })
      );
    });

    it('should return a CREATE_JOB_FAILURE action', () => {
      const gen = createJob(action);

      expect(gen.next().value).toEqual(
        call(fetchApi, 'POST', '/company/123/jobs', action.payload.data)
      );

      expect(
        gen.throw({
          errors: 'unable to create job'
        }).value
      ).toEqual(
        put({
          type: CREATE_JOB_FAILURE,
          errors: { errors: 'unable to create job' }
        })
      );
    });
  });
});
