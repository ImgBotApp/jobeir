export const CREATE_JOB_REQUEST = 'CREATE_JOB_REQUEST';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';

export const GET_JOBS_REQUEST = 'GET_JOBS_REQUEST';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
export const GET_JOBS_FAILURE = 'GET_JOBS_FAILURE';

export const GET_JOB_REQUEST = 'GET_JOB_REQUEST';
export const GET_JOB_SUCCESS = 'GET_JOB_SUCCESS';
export const GET_JOB_FAILURE = 'GET_JOB_FAILURE';

import { SWITCH_ACTIVE_COMPANY_SUCCESS } from '../../../user/ducks/';

export const initialState = {
  isLoading: false,
  isFetching: false,
  postings: [],
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case CREATE_JOB_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        postings: [...state.postings, action.payload.data.job],
        errors: []
      });
    case CREATE_JOB_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
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
    case GET_JOB_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_JOB_SUCCESS:
      const alreadyExists = state.postings.some(
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
      } else {
        return Object.assign({}, state, {
          isFetching: false,
          postings: [...state.postings, action.payload.data.posting],
          errors: []
        });
      }
    case GET_JOB_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors.errors
      });
    case SWITCH_ACTIVE_COMPANY_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item
    };
  });
}

export const createJob = (companyId, data, redirectPathname) => ({
  type: CREATE_JOB_REQUEST,
  payload: { companyId, data, redirectPathname }
});

export const getJobs = companyId => ({
  type: GET_JOBS_REQUEST,
  payload: { companyId }
});

export const getJob = (companyId, jobId) => ({
  type: GET_JOB_REQUEST,
  payload: { companyId, jobId }
});
