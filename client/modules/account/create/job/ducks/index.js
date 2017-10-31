// @flow
import { SWITCH_ACTIVE_COMPANY_SUCCESS } from '../../../../user/ducks/';

import { STRIPE_PAYMENT_SUCCESS } from '../../../../payments/stripe/ducks';

import { CREATE_COMPANY_SUCCESS } from '../../company/ducks';

export const CREATE_JOB_REQUEST = 'CREATE_JOB_REQUEST';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';

export const GET_JOBS_REQUEST = 'GET_JOBS_REQUEST';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_FAILURE = 'GET_JOBS_FAILURE';

export const GET_JOB_REQUEST = 'GET_JOB_REQUEST';
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE';

export const UPDATE_JOB_REQUEST = 'UPDATE_JOB_REQUEST';
export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';

export const DELETE_JOB_REQUEST = 'DELETE_JOB_REQUEST';
export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';

export const UPDATE_JOB_FILTER = 'UPDATE_JOB_FILTER';

export const initialState: {
  isCreating: boolean,
  isFetching: boolean,
  isUpdating: boolean,
  isDeleting: boolean,
  filter: string,
  postings: Array<{}>,
  errors: Array<{}>
} = {
  isCreating: false,
  isFetching: false,
  isUpdating: false,
  isDeleting: false,
  filter: 'All Jobs',
  postings: [],
  errors: []
};

export default (state: {} = initialState, action: {}): {} => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return Object.assign({}, state, {
        isCreating: true
      });
    case CREATE_JOB_SUCCESS:
      return Object.assign({}, state, {
        isCreating: false,
        postings: [...state.postings, action.payload.data.job],
        errors: []
      });
    case CREATE_JOB_FAILURE:
      return Object.assign({}, state, {
        isCreating: false,
        errors: action.errors.errors
      });
    case GET_JOBS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_JOBS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        postings: action.payload.data.postings,
        errors: []
      });
    case GET_JOBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors.errors
      });
    case UPDATE_JOB_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true
      });
    case UPDATE_JOB_SUCCESS:
      return Object.assign({}, state, {
        isUpdating: false,
        postings: state.postings.map(
          posting =>
            posting._id === action.payload.data.posting._id
              ? action.payload.data.posting
              : posting
        ),
        errors: []
      });
    case STRIPE_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        isUpdating: false,
        postings: state.postings.map(
          posting =>
            posting._id === action.payload.data.job._id
              ? action.payload.data.job
              : posting
        ),
        errors: []
      });
    case UPDATE_JOB_FAILURE:
      return Object.assign({}, state, {
        isUpdating: false,
        errors: action.errors.errors
      });
    case GET_JOB_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_JOB_SUCCESS:
      const alreadyExists: boolean = state.postings.some(
        posting => posting._id === action.payload.data.posting._id
      );

      if (alreadyExists) {
        return Object.assign({}, state, {
          isFetching: false,
          postings: state.postings.map(
            posting =>
              posting._id === action.payload.data.posting._id
                ? { ...posting, company: action.payload.data.posting.company }
                : posting
          ),
          errors: []
        });
      }
      return Object.assign({}, state, {
        isFetching: false,
        postings: [...state.postings, action.payload.data.posting],
        errors: []
      });

    case GET_JOB_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors.errors
      });

    case DELETE_JOB_REQUEST:
      return Object.assign({}, state, {
        isDeleting: true
      });
    case DELETE_JOB_SUCCESS:
      return Object.assign({}, state, {
        isDeleting: false,
        postings: state.postings.filter(posting => posting._id !== payload),
        errors: []
      });
    case DELETE_JOB_FAILURE:
      return Object.assign({}, state, {
        isDeleting: false,
        errors: action.errors.errors
      });
    case UPDATE_JOB_FILTER:
      return Object.assign({}, state, {
        filter: action.payload.filter
      });
    case SWITCH_ACTIVE_COMPANY_SUCCESS:
    case CREATE_COMPANY_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export const createJob = (
  companyId: string,
  data: {},
  redirectPathname: string
): {} => ({
  type: CREATE_JOB_REQUEST,
  payload: { companyId, data, redirectPathname }
});

export const getJobs = (companyId: string): {} => ({
  type: GET_JOBS_REQUEST,
  payload: { companyId }
});

export const getJob = (companyId: string, jobId: string): {} => ({
  type: GET_JOB_REQUEST,
  payload: { companyId, jobId }
});

export const updateJob = (companyId: string, jobId: string, data: {}): {} => ({
  type: UPDATE_JOB_REQUEST,
  payload: { companyId, jobId, data }
});

export const deleteJob = (
  companyId: string,
  jobId: string,
  redirectPathname: string
): {} => ({
  type: DELETE_JOB_REQUEST,
  payload: { companyId, jobId, redirectPathname }
});

export const updateJobFilter = (filter: string): {} => ({
  type: UPDATE_JOB_FILTER,
  payload: { filter }
});
