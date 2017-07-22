export const SERVER_GET_JOB_REQUEST = 'SERVER_GET_JOB_REQUEST';
export const SERVER_GET_JOB_SUCCESS = 'SERVER_GET_JOB_SUCCESS';
export const SERVER_GET_JOB_FAILURE = 'SERVER_GET_JOB_FAILURE';

export const initialState = {
  isLoaded: false,
  isFetching: false,
  posting: {},
  errors: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SERVER_GET_JOB_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SERVER_GET_JOB_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        posting: action.payload.data.posting,
        errors: []
      });
    case SERVER_GET_JOB_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        errors: action.errors.errors
      });

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
  type: SERVER_GET_JOB_REQUEST,
  payload: { jobId }
});
