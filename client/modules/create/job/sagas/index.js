import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  CREATE_JOB_REQUEST,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAILURE,
  GET_JOB_REQUEST,
  GET_JOB_SUCCESS,
  GET_JOB_FAILURE
} from '../ducks';
import { redirectTo } from '../../../user/ducks/';

export function* createJob(action) {
  try {
    const payload = yield call(
      fetchApi,
      'POST',
      `/company/${action.payload.companyId}/jobs`,
      action.payload.data
    );
    yield put({ type: CREATE_JOB_SUCCESS, payload });
    localStorage.removeItem('state');
    yield call(redirectTo, `${action.payload.redirectPathname}`);
  } catch (errors) {
    yield put({ type: CREATE_JOB_FAILURE, errors });
  }
}

export function* getJobsSaga(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/company/${action.payload.companyId}/jobs`
    );
    yield put({ type: GET_JOBS_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: GET_JOBS_FAILURE, errors });
  }
}

export function* getJobSaga(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/company/${action.payload.companyId}/jobs/${action.payload.jobId}`
    );
    yield put({ type: GET_JOB_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: GET_JOB_FAILURE, errors });
  }
}

export function* job() {
  yield takeEvery(CREATE_JOB_REQUEST, createJob);
  yield takeEvery(GET_JOBS_REQUEST, getJobsSaga);
  yield takeEvery(GET_JOB_REQUEST, getJobSaga);
}
