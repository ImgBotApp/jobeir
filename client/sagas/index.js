import { auth } from '../modules/auth/sagas';
import { company } from '../modules/jobs/sagas';
import { user } from '../modules/user/sagas';

export default function* rootSaga() {
  yield [
    auth(),
    company(),
    user(),
  ]
}