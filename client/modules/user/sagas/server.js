import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  SERVER_GET_USER_REQUEST,
  SERVER_GET_USER_SUCCESS,
  SERVER_GET_USER_FAILURE
} from '../ducks';
import { SERVER_AUTH_SUCCESS } from '../../auth/ducks/';

export function* serverGetUser(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/users/${action.payload.userId}`,
      '',
      '',
      action.payload.req
    );

    return yield put({ type: SERVER_GET_USER_SUCCESS, payload });
  } catch (errors) {
    return yield put({ type: SERVER_GET_USER_FAILURE, errors });
  }
}
export function* serverGetUserAfterAuth(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/users/${action.payload.data.id}`,
      '',
      '',
      action.req
    );

    return yield put({ type: SERVER_GET_USER_SUCCESS, payload });
  } catch (errors) {
    return yield put({ type: SERVER_GET_USER_FAILURE, errors });
  }
}

export function* serverUser() {
  // yield takeEvery(SERVER_GET_USER_REQUEST, serverGetUser);
  // yield takeEvery(SERVER_AUTH_SUCCESS, serverGetUserAfterAuth);
}
