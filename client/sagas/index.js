import { all } from 'redux-saga/effects';
import { auth } from '../modules/auth/sagas';
import { company } from '../modules/create/company/sagas';
import { job } from '../modules/create/job/sagas';
import { user } from '../modules/user/sagas';

export default function* rootSaga() {
  yield all([auth(), company(), job(), user()]);
}
