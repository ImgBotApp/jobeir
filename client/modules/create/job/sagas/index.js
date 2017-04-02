import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
} from '../ducks';

export function* postJob(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/jobs', action.payload.data);
      yield put({type: CREATE_JOB_SUCCESS, payload});
   } catch (errors) {
      yield put({type: CREATE_JOB_FAILURE, errors});
   }
}

export function* job() {
  yield takeEvery(CREATE_JOB_REQUEST, postJob);
}
