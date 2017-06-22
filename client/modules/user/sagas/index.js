import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  SWITCH_ACTIVE_COMPANY_REQUEST,
  SWITCH_ACTIVE_COMPANY_SUCCESS,
  SWITCH_ACTIVE_COMPANY_FAILURE,
  redirectTo
} from '../ducks';

export function* getUser(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/users/${action.payload.userId}`
    );

    yield put({ type: GET_USER_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: GET_USER_FAILURE, errors });
  }
}

export function* updateUser(action) {
  try {
    const payload = yield call(
      fetchApi,
      'PUT',
      `/users/${action.payload.userId}`,
      action.payload.data
    );

    yield put({ type: UPDATE_USER_SUCCESS, payload });

    // Redirect to desired path if it exists
    if (action.payload.redirectPathname) {
      yield call(redirectTo, action.payload.redirectPathname);
    }
  } catch (errors) {
    yield put({ type: UPDATE_USER_FAILURE, errors });
  }
}

export function* switchActiveCompanyUser(action) {
  try {
    const payload = yield call(
      fetchApi,
      'PUT',
      `/users/${action.payload.userId}`,
      action.payload.data
    );

    yield put({ type: SWITCH_ACTIVE_COMPANY_SUCCESS, payload });
    yield call(redirectTo, '/account/jobs');
  } catch (errors) {
    yield put({ type: SWITCH_ACTIVE_COMPANY_FAILURE, errors });
  }
}

export function* user() {
  yield takeEvery(GET_USER_REQUEST, getUser);
  yield takeEvery(UPDATE_USER_REQUEST, updateUser);
  yield takeEvery(SWITCH_ACTIVE_COMPANY_REQUEST, switchActiveCompanyUser);
}
