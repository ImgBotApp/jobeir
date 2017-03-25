import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  CREATE_COMPANY_REQUESTED,
  CREATE_COMPANY_SUCCEEDED,
  CREATE_COMPANY_FAILED,
} from '../ducks';

export function* postCompany(action) {
   try {
      const payload = yield call(fetchApi, 'POST', '/companies', action.payload.data);
      yield put({type: CREATE_COMPANY_SUCCEEDED, payload});
   } catch (errors) {
      yield put({type: CREATE_COMPANY_FAILED, errors});
   }
}

export function* company() {
  yield takeEvery(CREATE_COMPANY_REQUESTED, postCompany);
}
