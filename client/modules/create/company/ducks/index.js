export const CHECK_COMPANY_REQUEST = 'CHECK_COMPANY_REQUEST';
export const CHECK_COMPANY_SUCCESS = 'CHECK_COMPANY_SUCCESS';
export const CHECK_COMPANY_FAILURE = 'CHECK_COMPANY_FAILURE';

export const CREATE_COMPANY_REQUEST = 'CREATE_COMPANY_REQUEST';
export const CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS';
export const CREATE_COMPANY_FAILURE = 'CREATE_COMPANY_FAILURE';

export const CREATE_JOB_REQUEST = 'CREATE_JOB_REQUEST';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';

export const initialState = {
  isLoading: false,
  isChecking: false,
  details: {},
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case CREATE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        details: action.payload.data.company,
      });
    case CREATE_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.errors.errors,
      });
    case CHECK_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isChecking: true,
      });
    case CHECK_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isChecking: false,
        errors: [],
      });
    case CHECK_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isChecking: false,
        errors: action.errors.errors,
      });
    default:
      return state;
  }
};

export const createCompany = data => ({
  type: CREATE_COMPANY_REQUEST,
  payload: { data },
});
export const checkCompany = data => ({
  type: CHECK_COMPANY_REQUEST,
  payload: { data },
});
