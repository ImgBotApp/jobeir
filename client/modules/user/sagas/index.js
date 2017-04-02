import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../utils/api';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../ducks';

export function* getUser(action) {
   try {
      const payload = yield call(
        fetchApi,
        'GET',
        `/users/${action.payload.userId}`
      );
      
      yield put({type: GET_USER_SUCCESS, payload});
   } catch (errors) {
      yield put({type: GET_USER_FAILURE, errors});
   }
}


export function* user() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}
