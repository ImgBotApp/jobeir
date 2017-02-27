import { put, call, takeEvery } from 'redux-saga/effects';
import docCookies from '../../../utils/cookies';
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
} from '../ducks/';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const loginCall = (payload) => {
  const body = JSON.stringify(payload);

  return fetch('/api/v0/login', {
    method: 'POST',
    headers,
    body
  })
  .then(res => res.json());
};

export function* login(action) {
   try {
      const payload = yield call(loginCall, action.payload);
      docCookies.setItem('SID', payload.data.token)
      yield put({
        type: LOGIN_SUCCEEDED, 
        payload,
      });
   } catch (error) {
      yield put({type: LOGIN_FAILED, error})
   }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_REQUESTED, login)
}