import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  SERVER_AUTH_REQUEST,
  SERVER_AUTH_SUCCESS,
  SERVER_AUTH_FAILURE
} from '../ducks';

export function* serverAuthUser(action) {
  const req = action.payload.req;
  try {
    const payload = yield call(fetchApi, 'GET', '/auth', '', '', req);
    yield put({ type: SERVER_AUTH_SUCCESS, payload, req });
  } catch (errors) {
    yield put({ type: SERVER_AUTH_FAILURE, errors });
    throw errors;
  }
}

export function* serverAuth() {
  // yield takeEvery(SERVER_AUTH_REQUEST, serverAuthUser);
}
