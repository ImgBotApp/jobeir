import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAILURE,
} from '../ducks';

export function* postCompany(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/companies', action.payload.data);
      yield put({type: CREATE_COMPANY_SUCCESS, payload});
   } catch (errors) {
      yield put({type: CREATE_COMPANY_FAILURE, errors});
   }
}

export function* company() {
  yield takeEvery(CREATE_COMPANY_REQUEST, postCompany);
}
