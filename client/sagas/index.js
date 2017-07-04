import { auth } from '../modules/auth/sagas';
import { serverAuth } from '../modules/auth/sagas/server';
import { company } from '../modules/create/company/sagas';
import { job } from '../modules/create/job/sagas';
import { user } from '../modules/user/sagas';
import { serverUser } from '../modules/user/sagas/server';

export default function* rootSaga() {
  yield [auth(), serverAuth(), company(), job(), user(), serverUser()];
}
