import { watchCreateUser } from '../modules/signup/sagas/';

export default function* rootSaga() {
  yield [
    watchCreateUser(),
  ]
}