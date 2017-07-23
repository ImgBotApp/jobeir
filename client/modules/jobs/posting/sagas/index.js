import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  GET_JOB_POSTING_REQUEST,
  GET_JOB_POSTING_SUCCESS,
  GET_JOB_POSTING_FAILURE
} from '../ducks';

export function* getJobPostingSaga(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/jobs/${action.payload.jobId}`
    );
    yield put({ type: GET_JOB_POSTING_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: GET_JOB_POSTING_FAILURE, errors });
  }
}

export function* jobPosting() {
  yield takeEvery(GET_JOB_POSTING_REQUEST, getJobPostingSaga);
}
