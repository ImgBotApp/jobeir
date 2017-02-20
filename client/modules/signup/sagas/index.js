import { put, call, takeEvery } from 'redux-saga/effects'
import {
  SIGNUP_REQUESTED,
  SIGNUP_SUCCEEDED,
  SIGNUP_FAILED,
} from '../ducks/';

export function* createuUser(action) {
   try {
      console.log({action});
      const data = yield call('api', action.payload)
      yield put({type: SIGNUP_SUCCEEDED, data})
   } catch (error) {
      yield put({type: SIGNUP_FAILED, error})
   }
}

export function* watchCreateUser() {
  yield takeEvery(SIGNUP_REQUESTED, createuUser)
}