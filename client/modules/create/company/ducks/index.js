import { GET_USER_SUCCESS } from '../../../user/ducks/';

export const CHECK_COMPANY_REQUEST = 'CHECK_COMPANY_REQUEST';
export const CHECK_COMPANY_SUCCESS = 'CHECK_COMPANY_SUCCESS';
export const CHECK_COMPANY_FAILURE = 'CHECK_COMPANY_FAILURE';

export const CREATE_COMPANY_REQUEST = 'CREATE_COMPANY_REQUEST';
export const CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS';
export const CREATE_COMPANY_FAILURE = 'CREATE_COMPANY_FAILURE';

export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';

export const initialState = {
  isLoading: false,
  isChecking: false,
  details: {},
  errors: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        details: action.payload.data.user.companies
      });
    case CREATE_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case CREATE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        details: action.payload.data.company
      });
    case CREATE_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.errors.errors
      });
    case CHECK_COMPANY_REQUEST:
      return Object.assign({}, state, {
        isChecking: true
      });
    case CHECK_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        isChecking: false,
        errors: []
      });
    case CHECK_COMPANY_FAILURE:
      return Object.assign({}, state, {
        isChecking: false,
        errors: action.errors.errors
      });
    default:
      return state;
  }
};

export const createCompany = (data, redirectPathname) => ({
  type: CREATE_COMPANY_REQUEST,
  payload: { data, redirectPathname }
});

export const checkCompany = data => ({
  type: CHECK_COMPANY_REQUEST,
  payload: { data }
});
