// @flow
export const SEARCH_JOBS_REQUEST = 'SEARCH_JOBS_REQUEST';
export const SEARCH_JOBS_SUCCESS = 'SEARCH_JOBS_SUCCESS';
export const SEARCH_JOBS_FAILURE = 'SEARCH_JOBS_FAILURE';

export const FILTER_SEARCH_JOBS_REQUEST = 'FILTER_SEARCH_JOBS_REQUEST';
export const FILTER_SEARCH_JOBS_SUCCESS = 'FILTER_SEARCH_JOBS_SUCCESS';
export const FILTER_SEARCH_JOBS_FAILURE = 'FILTER_SEARCH_JOBS_FAILURE';

export const SERVER_SEARCH_JOBS_REQUEST = 'SERVER_SEARCH_JOBS_REQUEST';
export const SERVER_SEARCH_JOBS_SUCCESS = 'SERVER_SEARCH_JOBS_SUCCESS';
export const SERVER_SEARCH_JOBS_FAILURE = 'SERVER_SEARCH_JOBS_FAILURE';

export const TOGGLE_MOBILE_FILTERS = 'TOGGLE_MOBILE_FILTERS';
export const AUTOCOMPLETE_PREDICTIONS = 'AUTOCOMPLETE_PREDICTIONS';
export const RESET_JOBS = 'RESET_JOBS';

export const initialState = {
  count: 0,
  postings: [],
  query: '',
  isFetching: false,
  isFiltering: false,
  isLoaded: false,
  isOpen: false,
  showMobileFilters: false,
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_JOBS_REQUEST:
    case SERVER_SEARCH_JOBS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        query: action.payload.query
      });
    case FILTER_SEARCH_JOBS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFiltering: true,
        query: action.payload.query,
        postings: []
      });
    case SEARCH_JOBS_SUCCESS:
    case SERVER_SEARCH_JOBS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        count: action.payload.data.count,
        postings: [...state.postings, ...action.payload.data.postings]
      });
    case FILTER_SEARCH_JOBS_SUCCESS:
      /**
       *  When updating the filter we don't want to add the new jobs to
       * the list of current postings. It should be updated with a fresh set
       * of job postings
       */
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        count: action.payload.data.count,
        postings: action.payload.data.postings
      });
    case SEARCH_JOBS_FAILURE:
    case FILTER_SEARCH_JOBS_FAILURE:
    case SERVER_SEARCH_JOBS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.errors.errors
      });
    case AUTOCOMPLETE_PREDICTIONS:
      return Object.assign({}, state, {
        isOpen: action.payload
      });
    case TOGGLE_MOBILE_FILTERS:
      return Object.assign({}, state, {
        showMobileFilters: !state.showMobileFilters
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

export const filterSearchJobs = query => ({
  type: FILTER_SEARCH_JOBS_REQUEST,
  payload: { query }
});

export const resetJobs = () => ({
  type: RESET_JOBS
});

export const autocompletePredictions = (paylaod: boolean) => ({
  type: AUTOCOMPLETE_PREDICTIONS,
  paylaod
});

export const toggleMobileFilters = () => ({
  type: TOGGLE_MOBILE_FILTERS
});
