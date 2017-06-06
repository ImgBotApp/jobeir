export const CREATE_JOB_REQUEST = 'CREATE_JOB_REQUEST';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';

export const initialState = {
  isLoading: false,
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
        details: action.payload.data.company,
        errors: []
      });
    case CREATE_JOB_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.errors.errors
      });
    default:
      return state;
  }
};

export const createJob = (data, redirectPathname) => ({
  type: CREATE_JOB_REQUEST,
  payload: { data, redirectPathname }
});
