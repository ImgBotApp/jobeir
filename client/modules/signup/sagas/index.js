import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
} from '../ducks/';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const createUserCall = (payload) => {
  const body = JSON.stringify(payload);

  return fetch('/api/v0/register', {
    method: 'POST',
    headers,
    body
  });
};

export function* createuUser(action) {
   try {
      const data = yield call(createUserCall, action.payload);
      yield put({type: SIGNUP_SUCCEEDED, data})
   } catch (error) {
      yield put({type: SIGNUP_FAILED, error})
   }
}

export function* watchCreateUser() {
  yield takeEvery(SIGNUP_REQUESTED, createuUser)
}