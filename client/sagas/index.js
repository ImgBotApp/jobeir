import { user } from '../modules/auth/sagas';
import { company } from '../modules/jobs/sagas';

export default function* rootSaga() {
  yield [
    company(),
    user(),
  ]
}