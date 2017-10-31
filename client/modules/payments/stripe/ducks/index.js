export const STRIPE_PAYMENT_REQUEST = 'STRIPE_PAYMENT_REQUEST';
export const STRIPE_PAYMENT_SUCCESS = 'STRIPE_PAYMENT_SUCCESS';
export const STRIPE_PAYMENT_FAILURE = 'STRIPE_PAYMENT_FAILURE';

export const JOB_PAYMENT_MODAL = 'JOB_PAYMENT_MODAL';

export const initialState = {
  isPaying: false,
  hasPaid: false,
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case STRIPE_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        isPaying: true,
        hasPaid: false
      });
    case STRIPE_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        isPaying: false,
        hasPaid: true,
        ...action.payload.data
      });
    case STRIPE_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        isPaying: false,
        hasPaid: false,
        errors: action.payload.errors
      });
    default:
      return state;
  }
};

export const stripePaymentRequest = ({ activeCompany, job, token, user }) => ({
  type: STRIPE_PAYMENT_REQUEST,
  payload: {
    company: activeCompany,
    job,
    token,
    user
  }
});
