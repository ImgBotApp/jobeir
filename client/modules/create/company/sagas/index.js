import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  CHECK_COMPANY_REQUEST,
  CHECK_COMPANY_SUCCESS,
  CHECK_COMPANY_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAILURE,
} from '../ducks';

export function* createCompany(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/companies', action.payload.data);
      yield put({type: CREATE_COMPANY_SUCCESS, payload});
   } catch (errors) {
      yield put({type: CREATE_COMPANY_FAILURE, errors});
   }
}

export function* checkCompany(action) {
   try {
      const payload = yield call(fetchApi, 'GET', `/companies/check/${action.payload.data}`);
      yield put({type: CHECK_COMPANY_SUCCESS, payload});
   } catch (errors) {
      yield put({type: CHECK_COMPANY_FAILURE, errors});
   }
}

export function* company() {
  yield takeEvery(CHECK_COMPANY_REQUEST, checkCompany);
  yield takeEvery(CREATE_COMPANY_REQUEST, createCompany);
}
