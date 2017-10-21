import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import fireEscapeKeypress from '../../../utils/fireEscapeKeypress';
import queryParams from '../../../utils/queryParams';
import authRedirect from '../../../utils/authRedirect';
import docCookies from '../../../utils/cookies';
import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
  PASSWORD_REQUEST,
  PASSWORD_SUCCESS,
  PASSWORD_FAILURE,
  redirectTo
} from '../ducks';

export function* authUser(action) {
  const { redirectPathname } = action.payload;
  const authFailedRedirectPathname = authRedirect(redirectPathname);

  try {
    const payload = yield call(fetchApi, 'GET', '/auth');
    yield put({ type: AUTH_SUCCESS, payload });
    yield call(redirectTo, redirectPathname);
    yield call(fireEscapeKeypress);
  } catch (errors) {
    yield put({ type: AUTH_FAILURE, errors });
    yield call(redirectTo, authFailedRedirectPathname);
    throw errors;
  }
}

export function* signupUser(action) {
  try {
    const payload = yield call(fetchApi, 'POST', '/register', action.payload);

    if (payload !== undefined && payload.data.token) {
      docCookies.setItem('SID', payload.data.token);
    }

    yield put({ type: SIGNUP_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: SIGNUP_FAILURE, errors });
    throw errors;
  }
}

export function* loginUser(action, redirectPath = '/account/jobs') {
  const nextValue = queryParams(window.location.search).next;

  try {
    const payload = yield call(fetchApi, 'POST', '/login', action.payload);
    yield put({ type: LOGIN_SUCCESS, payload });

    if (payload.data.token) {
      docCookies.setItem('SID', payload.data.token);
    }

    if (nextValue) {
      redirectPath = nextValue;
    }

    yield call(redirectTo, redirectPath);
    yield call(fireEscapeKeypress);
  } catch (errors) {
    yield put({ type: LOGIN_FAILURE, errors });
  }
}

export function* logoutUser() {
  try {
    const payload = yield call(fetchApi, 'POST', '/logout');
    yield put({ type: LOGOUT_SUCCESS, payload });
    yield call(redirectTo, '/');
  } catch (errors) {
    yield put({ type: LOGOUT_FAILURE, errors });
  }
}

function* signupAndAuthUser(action) {
  try {
    yield call(signupUser, action);
    yield call(authUser, action);
  } catch (errors) {}
}

function* reset(action) {
  try {
    const payload = yield call(fetchApi, 'POST', '/reset', action.payload);
    yield put({ type: RESET_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: RESET_FAILURE, errors });
  }
}

function* password(action) {
  try {
    const payload = yield call(fetchApi, 'POST', '/password', action.payload);
    yield put({ type: PASSWORD_SUCCESS, payload });
    yield call(redirectTo, '/signin');
  } catch (errors) {
    yield put({ type: PASSWORD_FAILURE, errors });
  }
}

export function* auth() {
  yield takeEvery(AUTH_REQUEST, authUser);
  yield takeEvery(SIGNUP_REQUEST, signupAndAuthUser);
  yield takeEvery(LOGIN_REQUEST, loginUser);
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
  yield takeEvery(RESET_REQUEST, reset);
  yield takeEvery(PASSWORD_REQUEST, password);
}
