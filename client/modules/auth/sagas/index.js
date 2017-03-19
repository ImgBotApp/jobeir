import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import docCookies from '../../../utils/cookies';
import {
  AUTH_REQUESTED,
  AUTH_SUCCEEDED,
  AUTH_FAILED,
  SIGNUP_REQUESTED,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCEEDED,
  LOGOUT_FAILED,
  redirectTo
} from '../ducks';

export function* authUser(action) {
  const { redirectPathname } = action.payload;

   try {
      const payload = yield call(fetchApi, 'GET', '/auth');
      yield put({type: AUTH_SUCCEEDED, payload});
      yield call(redirectTo, redirectPathname);
   } catch (error) {
      yield put({type: AUTH_FAILED, error});
      yield call(redirectTo, `/login?next=${redirectPathname}`);
   }
}

export function* signupUser(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/register', action.payload);
      yield put({type: SIGNUP_SUCCEEDED, payload});
      yield call(redirectTo, '/account/profile');
   } catch (error) {
      yield put({type: SIGNUP_FAILED, error});
   }
}

export function* loginUser(action, redirectPath = '/account/profile') {
   try {
      const payload = yield call(fetchApi, 'POST', '/login', action.payload);
      yield put({type: LOGIN_SUCCEEDED, payload});

      if (payload.data.token) {
        docCookies.setItem('SID', payload.data.token);
      }
      
      yield call(redirectTo, redirectPath);
   } catch (error) {
      yield put({type: LOGIN_FAILED, error});
   }
}

export function* logoutUser() {
   try {
      const payload = yield call(fetchApi, 'POST', '/logout');
      yield put({type: LOGOUT_SUCCEEDED, payload});
      yield call(redirectTo, '/');
   } catch (error) {
      yield put({type: LOGOUT_FAILED, error});
   }
}

export function* user() {
  yield takeEvery(AUTH_REQUESTED, authUser);
  yield takeEvery(SIGNUP_REQUESTED, signupUser);
  yield takeEvery(LOGIN_REQUESTED, loginUser);
  yield takeEvery(LOGOUT_REQUESTED, logoutUser);
}
