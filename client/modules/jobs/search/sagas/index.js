import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_SUCCESS,
  SEARCH_JOBS_FAILURE,
  FILTER_SEARCH_JOBS_REQUEST,
  FILTER_SEARCH_JOBS_SUCCESS,
  FILTER_SEARCH_JOBS_FAILURE
} from '../ducks';

export function* searchJobsSaga(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/search/jobs?${action.payload.query}`
    );
    yield put({ type: SEARCH_JOBS_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: SEARCH_JOBS_FAILURE, errors });
  }
}

export function* filterSearchJobsSaga(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/search/jobs?${action.payload.query}`
    );
    yield put({ type: FILTER_SEARCH_JOBS_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: FILTER_SEARCH_JOBS_FAILURE, errors });
  }
}

export function* searchJobs() {
  yield takeEvery(SEARCH_JOBS_REQUEST, searchJobsSaga);
  yield takeEvery(FILTER_SEARCH_JOBS_REQUEST, filterSearchJobsSaga);
}
