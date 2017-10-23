import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../../utils/api';
import {
  CHECK_COMPANY_REQUEST,
  CHECK_COMPANY_SUCCESS,
  CHECK_COMPANY_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILURE,
  UPLOAD_COMPANY_LOGO_REQUEST,
  UPLOAD_COMPANY_LOGO_SUCCESS,
  UPLOAD_COMPANY_LOGO_FAILURE
} from '../ducks';
import { redirectTo } from '../../../../user/ducks/';

export function* createCompany(action) {
  try {
    const payload = yield call(
      fetchApi,
      'POST',
      '/companies',
      action.payload.data,
      true
    );
    yield put({ type: CREATE_COMPANY_SUCCESS, payload });
    yield call(
      redirectTo,
      `${action.payload.redirectPathname}/${payload.data.company._id}`
    );
  } catch (errors) {
    yield put({ type: CREATE_COMPANY_FAILURE, errors });
  }
}

export function* updateCompany(action) {
  try {
    const payload = yield call(
      fetchApi,
      'PUT',
      `/companies/${action.payload.companyId}`,
      action.payload.data
    );
    yield put({ type: UPDATE_COMPANY_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: UPDATE_COMPANY_FAILURE, errors });
  }
}

export function* checkCompany(action) {
  try {
    const payload = yield call(
      fetchApi,
      'GET',
      `/companies/check/${action.payload.data}`
    );
    yield put({ type: CHECK_COMPANY_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: CHECK_COMPANY_FAILURE, errors });
  }
}
export function* uploadCompanyLogo(action) {
  try {
    const payload = yield call(
      fetchApi,
      'POST',
      `/companies/${action.payload.companyId}/upload/logo`,
      action.payload.formData,
      'multipart/form-data'
    );

    yield put({ type: UPLOAD_COMPANY_LOGO_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: UPLOAD_COMPANY_LOGO_FAILURE, errors });
  }
}

export function* company() {
  yield takeEvery(CHECK_COMPANY_REQUEST, checkCompany);
  yield takeEvery(CREATE_COMPANY_REQUEST, createCompany);
  yield takeEvery(UPDATE_COMPANY_REQUEST, updateCompany);
  yield takeEvery(UPLOAD_COMPANY_LOGO_REQUEST, uploadCompanyLogo);
}
