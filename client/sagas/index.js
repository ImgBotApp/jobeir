import { watchCreateUser } from '../modules/signup/sagas/';
import { watchLogin } from '../modules/login/sagas/';

export default function* rootSaga() {
  yield [
    watchCreateUser(),
    watchLogin(),
  ]
}