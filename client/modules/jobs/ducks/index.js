import { browserHistory } from 'react-router';

export const SERVER_GET_JOBS_REQUEST = 'SERVER_GET_JOBS_REQUEST';
export const SERVER_GET_JOBS_SUCCESS = 'SERVER_GET_JOBS_SUCCESS';
export const SERVER_GET_JOBS_FAILURE = 'SERVER_GET_JOBS_FAILURE';

export const initialState = {
  postings: [],
  isFetching: false,
  isUpdating: false,
  isLoaded: false,
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SERVER_GET_JOBS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SERVER_GET_JOBS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        postings: action.payload.data.postings
      });
    case SERVER_GET_JOBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.payload.errors
      });
    default:
      return state;
  }
};

export function shouldGetJobs(globalState) {
  const isFetching =
    globalState.search.jobs && globalState.search.jobs.isFetching;

  return !isFetching;
}
