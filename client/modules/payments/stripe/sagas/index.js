import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchApi } from '../../../../utils/api';
import {
  STRIPE_PAYMENT_REQUEST,
  STRIPE_PAYMENT_SUCCESS,
  STRIPE_PAYMENT_FAILURE
} from '../ducks';

export function* stripePayment(action) {
  try {
    const payload = yield call(
      fetchApi,
      'POST',
      `/payments/stripe`,
      action.payload
    );
    yield put({ type: STRIPE_PAYMENT_SUCCESS, payload });
  } catch (errors) {
    yield put({ type: STRIPE_PAYMENT_FAILURE, errors });
  }
}

export function* payments() {
  yield takeEvery(STRIPE_PAYMENT_REQUEST, stripePayment);
}
