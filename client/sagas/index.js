import { auth } from '../modules/auth/sagas';
import { company } from '../modules/create/company/sagas';
import { job } from '../modules/create/job/sagas';
import { user } from '../modules/user/sagas';

export default function* rootSaga() {
  yield [auth(), company(), job(), user()];
}
