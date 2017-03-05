import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import docCookies from '../../../utils/cookies';
import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
} from '../ducks';

export function* signupUser(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/register', action.payload);
      yield put({type: SIGNUP_SUCCEEDED, payload});
   } catch (error) {
      yield put({type: SIGNUP_FAILED, error});
   }
}

export function* loginUser(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/login', action.payload);

      if (payload && !docCookies.getItems('SID')) {
        docCookies.setItem('SID', payload.data.token);
      }

      yield put({type: LOGIN_SUCCEEDED, payload});
   } catch (error) {
      yield put({type: LOGIN_FAILED, error});
   }
}

export function* logoutUser(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/logout', action.payload);
      yield put({type: LOGOUT_SUCCEEDED, payload});
   } catch (error) {
      yield put({type: LOGOUT_FAILED, error});
   }
}

export function* user() {
  yield takeEvery(SIGNUP_REQUESTED, signupUser);
  yield takeEvery(LOGIN_REQUESTED, loginUser);
  yield takeEvery(LOGOUT_REQUESTED, logoutUser);
}
