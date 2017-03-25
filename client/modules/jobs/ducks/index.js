export const CREATE_COMPANY_REQUESTED = 'CREATE_COMPANY_REQUESTED';
export const CREATE_COMPANY_SUCCEEDED = 'CREATE_COMPANY_SUCCEEDED';
export const CREATE_COMPANY_FAILED = 'CREATE_COMPANY_FAILED';

export const initialState = {
  isLoading: false,
  errors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMPANY_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case CREATE_COMPANY_SUCCEEDED:
      return Object.assign({}, state, {
        isLoading: false,
        ...action.payload.data,
      });
    case CREATE_COMPANY_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.errors.errors,
      });
    default:
      return state
  }
}

export const createCompany = (data) => ({ type: CREATE_COMPANY_REQUESTED, payload: { data } });
