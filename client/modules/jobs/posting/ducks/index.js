export const SERVER_GET_JOB_POSTING_REQUEST = 'SERVER_GET_JOB_POSTING_REQUEST';
export const SERVER_GET_JOB_POSTING_SUCCESS = 'SERVER_GET_JOB_POSTING_SUCCESS';
export const SERVER_GET_JOB_POSTING_FAILURE = 'SERVER_GET_JOB_POSTING_FAILURE';

export const GET_JOB_POSTING_REQUEST = 'GET_JOB_POSTING_REQUEST';
export const GET_JOB_POSTING_SUCCESS = 'GET_JOB_POSTING_SUCCESS';
export const GET_JOB_POSTING_FAILURE = 'GET_JOB_POSTING_FAILURE';

export const RESET_JOB_POSTING = 'RESET_JOB_POSTING';

export const initialState = {
  isLoaded: false,
  isFetching: false,
  posting: {
    company: {}
  },
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_POSTING_REQUEST:
    case SERVER_GET_JOB_POSTING_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_JOB_POSTING_SUCCESS:
    case SERVER_GET_JOB_POSTING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        posting: action.payload.data.posting,
        errors: []
      });
    case GET_JOB_POSTING_FAILURE:
    case SERVER_GET_JOB_POSTING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.payload.errors
      });
    case RESET_JOB_POSTING:
      return initialState;
    default:
      return state;
  }
};

export function shouldGetJob(globalState) {
  const isFetching = globalState.posting && globalState.posting.isFetching;
  const isLoaded = globalState.session.auth.globalIsLoaded;

  return !isFetching && !isLoaded;
}

export const serverGetJob = jobId => ({
  type: SERVER_GET_JOB_POSTING_REQUEST,
  payload: { jobId }
});

export const getJobPosting = jobId => ({
  type: GET_JOB_POSTING_REQUEST,
  payload: { jobId }
});

export const resetJobPosting = () => ({
  type: RESET_JOB_POSTING
});
