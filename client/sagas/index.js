import { user } from '../modules/auth/sagas/';

export default function* rootSaga() {
  yield [
    user(),
  ]
}