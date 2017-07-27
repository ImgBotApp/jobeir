import { browserHistory } from 'react-router';

export const SEARCH_JOBS_REQUEST = 'SEARCH_JOBS_REQUEST';
export const SEARCH_JOBS_SUCCESS = 'SEARCH_JOBS_SUCCESS';
export const SEARCH_JOBS_FAILURE = 'SEARCH_JOBS_FAILURE';

export const SERVER_SEARCH_JOBS_REQUEST = 'SERVER_SEARCH_JOBS_REQUEST';
export const SERVER_SEARCH_JOBS_SUCCESS = 'SERVER_SEARCH_JOBS_SUCCESS';
export const SERVER_SEARCH_JOBS_FAILURE = 'SERVER_SEARCH_JOBS_FAILURE';

export const RESET_JOBS = 'RESET_JOBS';

export const initialState = {
  count: 0,
  postings: [],
  isFetching: false,
  isUpdating: false,
  isLoaded: false,
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_JOBS_REQUEST:
    case SERVER_SEARCH_JOBS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SEARCH_JOBS_SUCCESS:
    case SERVER_SEARCH_JOBS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        count: action.payload.data.count,
        postings: [...state.postings, ...action.payload.data.postings]
      });
    case SEARCH_JOBS_FAILURE:
    case SERVER_SEARCH_JOBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.payload.errors
      });
    case RESET_JOBS:
      return Object.assign({}, state, {
        isLoaded: false,
        postings: []
      });
    default:
      return state;
  }
};

export function shouldGetJobs(globalState) {
  const isFetching =
    globalState.search.jobs && globalState.search.jobs.isFetching;
  const isLoaded = globalState.session.auth.globalIsLoaded;

  return !isFetching && !isLoaded;
}

export const searchJobs = query => ({
  type: SEARCH_JOBS_REQUEST,
  payload: { query }
});

export const resetJobs = () => ({
  type: RESET_JOBS
});
