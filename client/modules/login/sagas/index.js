import { put, call, takeEvery } from 'redux-saga/effects';
import docCookies from '../../../utils/cookies';
import { fetchApi } from '../../../utils/api';
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
} from '../ducks/';

export function* login(action) {
   try {
      const loginApi = fetchApi('POST', '/login', action.payload);
      const payload = yield call(loginApi);

      docCookies.setItem('SID', payload.data.token);
      
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